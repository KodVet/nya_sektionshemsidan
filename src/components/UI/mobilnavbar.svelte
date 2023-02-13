<script>
    import pages from '../../data/navbarConfig.json'
</script>
 
 <nav>
        <div class= "dropdown-menu">
            <ul>
                    <li> <a href indexedDB.astro id="start"> Start </a></li>
                    <li> <a href indexedDB.astro id ="start"> Om sektionen </a></li>
                        <div class = "dropdown-content"> <a href="">Intressant sida 1</a></div>
                        <div class = "dropdown-content"> <a href="">Intressant sida 2</a></div>
                    <li>Ny student</li>
                    <li>För medlemmar</li>
                    <li>Kontakt</li>
                </ul>
        </div>
            
 </nav>


<style>

nav .dropdown-menu {
    display: inline-block;
    position: relative;
}
nav .dropdown-content a{
    display: none;
    position: relative;
}

nav:hover .dropdown-content a {
    display: inline-block;
    position: relative;
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

