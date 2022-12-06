<script>
    export let frontmatters;
</script>

<ul>
    {#each frontmatters as frontmatter}
    <li>
        <h1><a href={'#' + frontmatter.title}>{frontmatter.title}</a></h1>
        <h3>{frontmatter.date}</h3>
    </li>
    {/each}
</ul>

<style lang="scss">

    ul {
        position: fixed;
        li {
            margin-bottom: 50px;
            color: black;
            h1 {
                    a {
                        text-decoration: none;
                        color: black;
                        transition: ease-in-out .1s;
                        display: block;
                        &:hover {
                            color: rgb(152, 152, 152);
                        }
                    }
                    
                }
            }
        }
    
    
</style>