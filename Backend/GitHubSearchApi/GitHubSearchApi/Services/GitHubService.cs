using GitHubSearchApi.Models;
using System.Net.Http.Headers;
using System.Text.Json;

namespace GitHubSearch.Api.Services;

public class GitHubService
{
    private readonly HttpClient _httpClient;

    public GitHubService(HttpClient httpClient)
    {
        _httpClient = httpClient;

        _httpClient.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("GitHubSearchApp", "1.0"));
    }

    public async Task<GitHubSearchResult> SearchRepositoriesAsync(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return new GitHubSearchResult { Items = new List<Repository>() };
        }

        var response = await _httpClient.GetAsync($"https://api.github.com/search/repositories?q={query}");
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<GitHubSearchResult>(content);
        return result;
    }
}