<script>
    export let posts
    import { format } from "date-fns";
    console.log("posts i svelte", posts)
    
</script>

<a href="#">
    <div class="container">
        <ol>
            {#each posts as { title, date, authors, useNamn, usePost, useUtskott }}
                <li>
                    <div class="highlight"></div>
                    <div class="main">
                        <p>{title}</p>
                        <p>
                            <time datetime={new Date(date)}>{format(new Date(date), 'dd/MM/yyyy')}</time>
                            {#if useNamn || usePost || useUtskott}
                            av
                            {/if}
                            {#each authors as author, index}
                            {#if useNamn}
                                {author.namn}
                            {/if}
                            {#if useNamn && usePost}
                                {" - "}
                            {/if}
                            {#if usePost}
                                {author.post}
                            {/if}
                            {#if (usePost && useUtskott || useNamn && useUtskott)}
                                {" - "}
                            {/if}
                            {#if useUtskott}
                                {author.utskott}
                            {/if}
                            {#if authors[index + 1]}
                                <span style="margin-left: -4px;">{', '.trimStart()}</span>
                            {/if}
                            {/each}
                        </p>
                        <p>Läs mer →</p>
                    </div>
                </li>
            {/each}
        </ol>
    </div>
</a>