<script> 
import { pages } from '../../data/navbarConfig.json'



</script>
<div class="container">
    <div class="mobileHeader"></div>
    <nav>
        <ul>
            {#each pages as page}
                <li>
                    <details>
                        <summary><a href={page.url}>{page.btnName}</a></summary>
                        <ul class="dropdown">
                            {#each page.childPages as childpage}
                            {#if childpage}    
                                <li><a href={childpage.url}>{childpage.btnName}</a></li>
                            {/if}
                            {/each}
                        </ul>
                    </details>
                </li>
            {/each}
        </ul>
    </nav>
</div>

<style lang="scss">

    summary{
        list-style: none;
        text-decoration: none;
        
    }
    summary::-webkit-details-marker {
        display:none;
    }
    .container {
        background-color: var(--koggis-grön);
        .mobileHeader {
            height: 50px;
        }
        ul{
            display: flex;
            justify-content: center;
            flex-direction: column;
            margin: 0px;
            list-style: none;
            text-decoration: none;
            align-items:center;
            padding: 0;
            // margin: auto;
            li{
                width: fit-content;
                a{
                    text-decoration: none;
                    color: black;
                    &:hover {
                        color: #FFFF;
                        text-decoration: none;
    
                    }
                }
            }
        }
    }
</style>