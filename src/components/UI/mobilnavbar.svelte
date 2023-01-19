<script>
    import pages from '../../data/navbarConfig.json'
</script>
 
 <nav>
        <ul>
            <div class= "dropdown">
                <li> <a href indexedDB.astro> Start </a></li>
                    <div class = "dropdown-content"> <a href="">Intressant sida 1</a></div>
                    <div class = "dropdown-content"> <a href="">Intressant sida 2</a></div>
            </div>
            <li>Om sektionen</li>
            <li>Ny student</li>
            <li>För medlemmar</li>
            <li>Kontakt</li>
        </ul>
 </nav>


<style>

nav{

    display: none;


}
ul{

   justify-content: space-between; 
   list-style-type: none;
   margin: 0px;
   padding: 0px;
   
}
.dropdown {
  position: relative;
  display: inline-block;

}
.dropdown-content {
    display: none;
}
.dropdown-content a {
    display: block;
}

nav:hover .dropdown-content {display: block;}
nav:hover .dropbtn {background-color: var(--navbar-bg);}


@media (max-width: 576px) 
{nav {
    display:flex; 
    margin: auto; 
    width: 90%;
    justify-content: center; }
}

</style>

