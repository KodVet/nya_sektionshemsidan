<script>
    export let posts
    import { format } from "date-fns";
    console.log("posts i svelte", posts)
    
</script>

<div class="container">
    <ol>
        {#each posts as { title, date, authors, useNamn, usePost, useUtskott }}
            <li>
                <a href={'/student/nyheter/' + title}>
                    <div class="wrapper">
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
                    </div>
                </a>
            </li>
        {/each}
    </ol>
</div>

<style lang="scss">
    .container {
        width: 100%;
        margin: auto;
    }
    
    a {
        text-decoration: none;
        color: black;
    }
    ol {
        padding: 0;
        list-style: none;
    }
    li {
        background-color: white;
        transition: background-color 100ms ease;
        &:nth-child(n):hover {
            background-color: var(--limejuice);
            .highlight {
                opacity: 1;
            }
        }
    }
    .wrapper {
        height: 36px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    li:nth-child(2n) {
        background-color: rgb(216, 216, 216);
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
        align-items: center;
        width: calc(100% - 16px);
        height: 100%;
        p {
            margin: 0;
        }
        p:not(.readmore) {
            overflow: clip;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-clip-margin: 3px;
        }
        .readmore {
            white-space: nowrap;
        }
        .title {
            flex-basis: 47%;
        }
        .dateauthor {
            flex-basis: 42%;
            color: var(--regnig-betong);
        }
    }

    @container (max-width: 500px) {
        .wrapper {
            height: fit-content;
            .main {
                flex-direction: column;
                align-items: unset;
                p:first-child {
                    margin-top: 8px;
                }
                p:last-child {
                    margin-top: 10px;
                    margin-bottom: 8px;
                }
                p {
                    margin-block: 3px;
                    white-space: unset;
                }
            }
        }
    }

</style>