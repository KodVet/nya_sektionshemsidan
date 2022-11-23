<script>
    export let active
</script>

<div class="ddbutton">
    <li><a href="/" class={active === "start" ? 'underlined' : ''}>Start</a></li>
    <div class="ddcontent" style = "margin-top: 30px;">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
    </div>
</div>

<style>
     .ddbutton:hover .ddcontent {
      display:flex;
    }
    .ddcontent{
        display: none;
        position: fixed;
        left: 0px;
        background-color: #f9f9f9;
        width:100%;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .ddcontent a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
}

</style>