using GitHubSearchApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace GitHubSearchApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookmarksController : ControllerBase
{
    private const string BookmarksKey = "UserBookmarks";

    [HttpGet]
    public IActionResult GetBookmarks()
    {
        var bookmarks = GetBookmarksFromSession();
        return Ok(bookmarks);
    }

    [HttpPost]
    public IActionResult AddBookmark([FromBody] Repository repository)
    {
        if (repository == null)
        {
            return BadRequest("Repository data is required.");
        }

        var bookmarks = GetBookmarksFromSession();

        if (!bookmarks.Any(r => r.Id == repository.Id))
        {
            bookmarks.Add(repository);
            SaveBookmarksToSession(bookmarks);
        }

        return Ok(bookmarks);
    }

    [HttpDelete("{id}")]
    public IActionResult RemoveBookmark(long id)
    {
        var bookmarks = GetBookmarksFromSession();
        var repoToRemove = bookmarks.FirstOrDefault(r => r.Id == id);

        if (repoToRemove != null)
        {
            bookmarks.Remove(repoToRemove);
            SaveBookmarksToSession(bookmarks);
        }

        return Ok(bookmarks);
    }


    private List<Repository> GetBookmarksFromSession()
    {
        var bookmarksJson = HttpContext.Session.GetString(BookmarksKey);
        if (string.IsNullOrEmpty(bookmarksJson))
        {
            return new List<Repository>();
        }

        return JsonSerializer.Deserialize<List<Repository>>(bookmarksJson) ?? new List<Repository>();
    }

    private void SaveBookmarksToSession(List<Repository> bookmarks)
    {
        var bookmarksJson = JsonSerializer.Serialize(bookmarks);
        HttpContext.Session.SetString(BookmarksKey, bookmarksJson);
    }
}