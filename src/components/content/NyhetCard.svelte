<script>
    import { format } from "date-fns";
    import { sv } from 'date-fns/locale/index.js'
    import './containerQueries.css'
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
    }
    export let reverse = false
    // let authors
    // if (typeof post.authors[0] === 'string') {
    //     const allAuthors = import.meta.glob('../../data/medlemmar/*.md', {eager: true})
    //     const filteredAuthors = post.authors.map(uuid => {
    //         return Object.entries(allAuthors).find(([key]) => {
    //             return key.includes(uuid)
    //         })[1] // [1]:an är värdet, då Object.entries(<objekt>) returnerar en lista av listor med [nyckel, värde]
    //         })
    //         // console.log("filteredauthors", filteredAuthors)
            
    //         authors = filteredAuthors.map(author => author.frontmatter)
    //     } else authors = post.authors

    const { title, date, authors, useNamn, usePost, useUtskott, img = ""} = post
</script>

<div class="container">
    <a href={'/student/nyheter/' + title}>
        <div class="highlight"></div>
        <article class:reverse={reverse}>
            <div class="image wrapper">
                <img src={img} alt="" height="208px" width="265px">
            </div>
            <div class="text wrapper">
                <h1 class="underline">
                    {title}
                </h1>
                <h6>
                    <time datetime={new Date(date)}>{format(new Date(date), 'dd/MM/yyyy')}</time>
                    {#if useNamn || usePost || useUtskott}
                    av
                    {/if}
                    <div class="author">
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
                    </div>
                </h6>
                <div class="excerpt">
                    <slot>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id asperiores quas quos. Ex fugiat at fugit obcaecati sapiente incidunt! Rem distinctio voluptate ut. Consequuntur placeat harum laudantium error, aliquam architecto.
                    Vitae, assumenda quos. Tenetur quia libero cumque corporis quidem cum quibusdam temporibus? Fugiat quos esse harum libero perferendis, ipsam illum maxime ducimus. Sunt minima repellat omnis maiores optio consectetur accusantium.
                    </slot>
                </div>
                <p class="underline readmore">Läs mer →</p>
            </div>
        </article>
    </a>
</div>

<style lang="scss">
    h1,h2,h3,h4,h5,h6 {
        margin-bottom: 5px;
        margin-top: 0px;
    }
    h1 {
        margin-top: 5px;
    }
    h6 {
        color: var(--regnig-betong);
        margin-bottom: 8px;
    }
    a {
        width: 100%;
        text-decoration: none;
        color: black;
    }
    .highlight {
        background-color: transparent;
        width: 6px;
        flex-basis: 2px; //nånting förstörde width: 100%, fattar inte vad
        transition: background-color .08s ease-in-out;
    }

    .container {
        background-color: white;
        height: fit-content;
        width: calc(100% - 20px);
        margin: auto;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        border-radius: 0px;
        display: flex;
        position: relative;
        justify-content: space-between;
        
        &:hover {
            .highlight {
                background-color: green;
            }
            // .underline::after {
            //     opacity: 1;
            // }
            .underline {
                text-decoration: underline black;
            }
        }
    }
    article.reverse {
        flex-direction: row-reverse;
    }
    .underline {
        text-decoration: underline transparent;
        transition: text-decoration 80ms ease-in-out;
        position: relative;
    }
    // .underline::after, h3::after {
    //     transition: opacity .08s ease-in-out;
    //     content: '';
    //     width: 100%;
    //     left: 0px;
    //     font-weight: 100;
    //     position: absolute;
    //     opacity: 0;
    //     text-decoration: underline;
    // }
    article {
        font-size: 20px;
        flex-grow: 1;
        margin: 15px;
        display: flex;
        gap: 20px;
    }
    .text.wrapper {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .text.wrapper > .excerpt {
        margin-bottom: calc(1em - 11px);
        line-height: 1.1;
        overflow: clip;
        overflow-clip-margin: 1px;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical; 
    }
    .text.wrapper > .readmore {
        margin-top: auto;
        margin-bottom: 5px;
    }
    .image.wrapper {
        min-width: 265px;
        display: flex;
        align-items: center;
        img {
            object-fit: cover;
        }
    }

    @container (max-width: 500px) {
    .container {
        width: 295px !important;
        height: fit-content;
    }
    article {
        flex-direction: column !important;
    }
    .excerpt {
        -webkit-line-clamp: 13 !important;
    }
}
</style>