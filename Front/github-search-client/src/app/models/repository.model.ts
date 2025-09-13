export interface GitHubSearchResult {
  items: Repository[];
}

export interface Repository {
  id: number;
  name: string;
  owner: Owner;
  html_url: string;
}

export interface Owner {
  login: string;
  avatar_url: string;
}

