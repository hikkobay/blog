resource "vercel_project" "with_git" {
  name = "blog"
  framework = "nuxtjs"
  git_repository = {
    type = "github"
    repo = "hikkobay/blog"
  }
}