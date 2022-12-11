<script>
    export let frontmatters;
</script>

<ul>
    {#each frontmatters as { date, title }}
    <li>
        <h1><a href={'#' + title}>{title}</a></h1>
        <h3>{date}</h3>
    </li>
    {/each}
</ul>

<style lang="scss">
ul {
    position: sticky;
    top: 300px;
    z-index: 10;
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