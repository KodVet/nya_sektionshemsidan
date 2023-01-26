const posts = Object.values(import.meta.glob('../../data/nyheter/*.md', {eager: true}))

export function getStaticPaths () {
    
    console.log(posts)
    return posts.map((post, index) => {
        return {
            params: {post: String(index)}
        }
    })
  }
  export async function get({params, request}) {
    const post = posts[params.post]
    return {
      body: JSON.stringify({
        frontmatter: post.frontmatter,
        file: post.file,
        url: post.url,
        rawContent: post.rawContent(),
        compiledContent: post.compiledContent(),
        getHeadings: post.getHeadings(),
      }),
    };
  }