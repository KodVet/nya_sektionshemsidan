<script> 
    import { pages } from '../../data/navbarConfig.json'

    let expanded = false

</script>
<div class="container">
    <div class="mobileHeader">
        <a href="/"><img src="/images/KogvetHuvet.svg" alt="det är ju loggan hummer" height="40px"/></a>
        <button on:click={()=>expanded=!expanded}><img src="images/the-squirtle-squad.jpeg" height="40px"/></button>
    </div>
        
    <nav class:expanded={expanded}>
        <hr>
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
        position: fixed;
        z-index: 100;
        display: none;
        .mobileHeader {
            background-color: var(--koggis-grön);
            height: fit-content;
            width: 100vw;
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
        button {
                border: none;
                cursor: pointer;
                appearance: none;
                background-color: var(--koggis-grön);
        }
        nav {
            background-color: var(--koggis-grön);
            clip-path: inset(100% 0 0 0);
            transform: translateY(-100%);
            transition: all .5s ease-in-out;
            width: 100%;
            height: calc(100vh - 85.33px);
            &.expanded {
                clip-path: inset(0% 0 0 0);
                transform: translateY(0);
            }
            ul{ 
                height: auto;
                display: flex;
                justify-content: center;
                flex-direction: column;
                margin: auto;
                list-style: none;
                text-decoration: none;
                align-items:center;
                padding: 0;
                overflow: hidden;
                transition: height .5s ease-in-out;
                gap: 20px;
                padding-top: 50px;
                 

                li{
                    padding: 10px;
                    background-color: var(--koggis-grön);
                    
                    
                    //rgb(190, 244, 172);
                    // Den här färgen på expanderade bakgrunder med svar text ^
                    
                    width: fit-content;
                    a{
                        font-size: 24pt;
                        text-decoration: none;
                        color: white;
                        &:hover {
                            color: #FFFF;
                            text-decoration: none;
                        }
                        &:active { 
                            text-decoration: dotted;
                            text-decoration-color: red ;  
                        }
                        
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