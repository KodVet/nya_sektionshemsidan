<script>
    import {pages} from '../../data/navbarConfig.json'
    export let active = "/om-sektionen"
    

</script>

<nav>
<ul>
    {#each pages as { url, btnName, childPages }, topIndex}
    <li class="navBtn" id="{btnName}"
        class:active={active.split('/')[1] === (url).split('/')[1]}>
        <a href="{url}">{btnName}</a>
    </li>

    {#if childPages.length > 0}
                <div class="ddcontent" 
                     
                    id={btnName}> 
                    <ul>
                    {#each childPages as { url, btnName }, index}
                        <li class="button" 
                        class:active={active.split('/')[2] && (active.split('/')[2] === (url).split('/')[2])}>
                            <div class="dot"></div>
                            <a 
                                tabindex={'0'} 
                                href="{url}">
                                {btnName}
                            </a>
                        </li>
                         <li class="line"></li>
                        
                        {/each}
                    </ul>
                </div>
                {/if}
    {/each}
</ul>
</nav>
<!--
    <nav>
        <div class= "dropdown-menu">
            <ul>
                    <li> <a href indexedDB.astro id="start"> Start </a></li>
                    <li> <a href indexedDB.astro id ="sektionen"> Om sektionen </a></li>
                        <div class = "dropdown-content"> <a href="">Intressant sida 1</a></div>
                        <div class = "dropdown-content"> <a href="">Intressant sida 2</a></div>
                    <li>Ny student</li>
                    <li>För medlemmar</li>
                    <li>Kontakt</li>
                </ul>
        </div>
            
 </nav>

-->
<style>
nav{
    display:none;
}

ul .navBtn .ddcontent {
    display:none;
}
ul .navBtn button:hover {
    display: inline-block;

}

nav:hover .dropdown-content a {
    display: inline-block;
    position: relative;
}
.active{
    color:red;
}

/*nav:hover .dropdown-content {display: block;}
nav:hover .dropbtn {background-color: var(--navbar-bg);}*/

@media (max-width: 576px) 
{nav {
    display:flex; 
    margin: auto; 
    width: 90%;
    justify-content: center; }
}

</style>

