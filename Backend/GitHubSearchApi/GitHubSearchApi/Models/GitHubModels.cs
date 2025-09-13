using System.Text.Json.Serialization;

namespace GitHubSearchApi.Models;

public class GitHubSearchResult
{
    [JsonPropertyName("items")]
    public List<Repository> Items { get; set; }
}

public class Repository
{
    [JsonPropertyName("id")]
    public long Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("owner")]
    public Owner Owner { get; set; }

    [JsonPropertyName("html_url")]
    public string Url { get; set; }
}

public class Owner
{
    [JsonPropertyName("login")]
    public string Login { get; set; }

    [JsonPropertyName("avatar_url")]
    public string AvatarUrl { get; set; }
}