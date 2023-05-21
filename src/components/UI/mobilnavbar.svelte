<script> 
import { pages } from '../../data/navbarConfig.json'



</script>
<div class="container">
    <div class="mobileHeader">
        <img src="/images/KogvetHuvet.svg" alt="det är ju loggan hummer" height="40px"/>
        <button>dropdown</button>
    </div>
        
    <hr>
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
        display: none;
        background-color: var(--koggis-grön);
        .mobileHeader {
            height: fit-content;
            display: flex;
            // flex-direction: column;
            justify-content: space-between;
            img {
                padding: 20px;
            }
        }
        hr {
            margin: 0;
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
                background-color: rgb(190, 244, 172);
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
@media (max-width: 576px) {
    .container {
        display:block; 
        // margin: auto; 
        // width: 90%;
        // justify-content: center; }
    }
}

</style>