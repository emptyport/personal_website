Jekyll::Hooks.register :posts, :pre_render do |post, payload|
  docExt = post.extname.tr('.', '')
  post.content.gsub!(/!\[(.*)\]\(([^\)]+)\)(?:{:([^}]+)})*/, '{% responsive_image path: \2 \3 template: _includes/responsive-image-blog.html %}')
  post.content.gsub! 'path: /', 'path: ' #you can probably optimise this a bit
end