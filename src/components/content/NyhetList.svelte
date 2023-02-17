<script>
    export let posts
    import { format } from "date-fns";
    console.log("posts i svelte", posts)
    
</script>

<div class="container">
    <ol>
        {#each posts as { title, date, authors, useNamn, usePost, useUtskott }}
            <a href={'/student/nyheter/' + title}>
                <li>
                    <div class="highlight"></div>
                    <div class="main">
                        <p class="title"><b>{title}</b></p>
                        <p class="dateauthor">
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
                        <p class="readmore">Läs mer →</p>
                    </div>
                </li>
            </a>
        {/each}
    </ol>
</div>

<style lang="scss">
    .container {
        
        width: calc(100% - 20px);
        margin: auto;
    }
    
    a {
        text-decoration: none;
        color: black;
    }
    ol {
        padding: 0;
    }
    li {
        background-color: white;
        transition: background-color 100ms ease;
        height: 36px;
        &:nth-child(n):hover {
            background-color: var(--limejuice);
            .highlight {
                opacity: 1;
            }
        }
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:nth-child(even) {
			background-color: rgb(226, 226, 226);
		}
    }
    .highlight {
        background-color: black;
        width: 2px;
        height: 100%;
        opacity: 0;
        transition: opacity 100ms ease;
    }
    .main {
        padding-inline: 8px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        p {
            overflow: clip;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-clip-margin: 3px;
        }
        .title {
            flex-basis: 47%;
        }
        .dateauthor {
            flex-basis: 42%;
            color: var(--regnig-betong);
        }
    }
</style>