using GitHubSearch.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GitHubSearchApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GitHubController : ControllerBase
{
    private readonly GitHubService _githubService;
    private readonly ILogger<GitHubController> _logger; 

    public GitHubController(GitHubService githubService, ILogger<GitHubController> logger)
    {
        _githubService = githubService;
        _logger = logger; 
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest("Search query cannot be empty.");
        }

        try
        {
            var result = await _githubService.SearchRepositoriesAsync(query);
            return Ok(result);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Failed to communicate with GitHub API for query: {Query}", query);

            return StatusCode(503, "The GitHub service is temporarily unavailable. Please try again later.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred while searching for query: {Query}", query);
            return StatusCode(500, "An internal server error occurred.");
        }
    }
}