source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`.
# Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
# gem "jekyll", "~> 4.4.1" # <--- 确保这一行被注释掉

# This is the default theme for new Jekyll sites.
# You may change this to anything you like.
gem "minima", "~> 2.5" # 保持这个版本

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# 我们指定一个 GitHub Pages 当前使用的稳定版本，以确保兼容性
gem "github-pages", "~> 229", group: :jekyll_plugins # <--- 修改这里，确保取消注释，并指定版本

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  # 修改 jekyll-minifier 版本，以解决之前的冲突
  gem "jekyll-minifier", "~> 0.1" 
end
 
# ... (你的其他平台特定或性能优化 gems，保持不变) ...

# 添加 csv gem，解决 Ruby 3.4.0 中的 LoadError
gem "csv"
# 添加 webrick gem，解决 Ruby 3.x 中 serve 命令的 LoadError
gem "webrick" 

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]