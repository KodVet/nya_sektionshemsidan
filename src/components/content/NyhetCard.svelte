<script>
    import { format } from "date-fns";
    import { sv } from 'date-fns/locale/index.js'
    export let post = {
        title: "Rubrik",
        authors: [
            {
                namn: "Författare"
            }
        ],
        useNamn: true,
        usePost: false,
        useUtskott: false,
        date: new Date(),
        excerpt: ``
    }
    export let reverse = false
    const { title, authors, date, excerpt, useNamn, usePost, useUtskott, image = ""} = post
</script>
<a href="#">
    <div class="container">
        <div class="highlight"></div>
        <article class:reverse={reverse}>
            <div class="image wrapper">
                <slot name="image">
                    <img src={image} alt="" height="100%" width="100%">
                </slot>
            </div>
            <div class="text wrapper">
                <h4>
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
                </h4>
                <h6>
                    <time datetime={new Date(date)}>{format(new Date(date), 'dd-MMMM-yyyy', {locale: sv})}</time>
                </h6>
                <slot>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id asperiores quas quos. Ex fugiat at fugit obcaecati sapiente incidunt! Rem distinctio voluptate ut. Consequuntur placeat harum laudantium error, aliquam architecto.
                Vitae, assumenda quos. Tenetur quia libero cumque corporis quidem cum quibusdam temporibus? Fugiat quos esse harum libero perferendis, ipsam illum maxime ducimus. Sunt minima repellat omnis maiores optio consectetur accusantium.
                </slot>
                <p class="underline">Läs mer →</p>
            </div>
        </article>
    </div>
</a>

<style lang="scss">
    a {
        text-decoration: none;
        color: black;
    }
    .highlight {
        background-color: transparent;
        width: 3px;
        height: 100%;
        transition: background-color .08s ease-in-out;
    }
    .container {
        background-color: white;
        height: 230px;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        border-radius: 0px;
        display: flex;
        position: relative;
        justify-content: space-between;
        &:hover {
            .highlight {
                background-color: green;
            }
            .underline::after {
                opacity: 1;
            }
        }
    }
    article.reverse {
        flex-direction: row-reverse;
    }
    .underline, h3 {
        position: relative;
    }
    .underline::after, h3::after {
        transition: opacity .08s ease-in-out;
        content: 'Läs mer →';
        left: 0px;
        font-weight: 100;
        position: absolute;
        opacity: 0;
        text-decoration: underline;
    }
    article {
        flex-grow: 1;
        margin: 15px;
        display: flex;
        gap: 20px;
    }
    .text.wrapper {
        flex-grow: 1;
    }
    .image.wrapper {
        height: 200px;
        width: 200px;
        flex-shrink: 0;
    }
</style>