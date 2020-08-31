<?php


?>
<style>
    $black: #202020;
    $white: #fff;
    $dark-grey: #808080;
    $light-grey: #d9d9d9;
    $purple: #B97CFC;
    $pink: #F93B69;
    $green: #B0E8E2;
    $orange: #EB8B6E;



    .container {
        max-width: 350px;
        max-height: 630px;
        overflow: hidden;
        margin: 30px auto 0;
        box-shadow: 0 0 40px lighten($black, 50);
        font-family: 'Open Sans', sans-serif;
    }

    .color-overlay {
        padding: 3em 2em;
        box-sizing: border-box;
        background: #fefefe ;
    }

    .date-right {
        display: inline-block;
    }

    .day-name {
        font-size: 1.6em;
    }

    .month {
        text-transform: uppercase;
        font-weight: 300;
        font-size: 0.6em;
        letter-spacing: 2px;
        margin-top: 2px;
    }

    .timeline {

    ul {
        padding: 1em 0 0 2em;
        margin: 0;
        list-style: none;
        position: relative;

    &::before {
         content: ' ';
         height: 100%;
         width: 1px;
         background-color: $light-grey;
         position: absolute;
         top: 0;
         left: 2.5em;
         z-index: -1;
     }
    }

    li div{
        display: inline-block;
        margin: 1em 0;
        vertical-align: top;
    }

    .bullet {
        width: 1em;
        height: 1em;
        box-sizing: border-box;
        border-radius: 50%;
        background: $white;
        z-index: 1;
        margin-right: 1em;

    &.pink {
         border: 2px solid $pink;
     }

    &.green {
         border: 2px solid $green;
     }

    &.orange {
         border: 2px solid $orange;
     }
    }

    .time {
        width: 20%;
        font-size: 0.75em;
        padding-top: 0.25em;
    }

    .desc {
        width: 50%;
    }

    h3 {
        font-size: 0.9em;
        font-weight: 400;
        margin: 0;
    }

    h4 {
        margin: 0;
        font-size: 0.7em;
        font-weight: 400;
        color: $dark-grey;
    }

    .people img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    }
</style>
<div class="container">
    <div class="header">
        <div class="color-overlay">
            <div class="date-right">
                <div class="day-name">Task Timeline</div>
                <div class="month">A short summary of the task</div>
            </div>
        </div>
    </div>

    <div class="timeline">
        <ul>
<!--            first element-->
            <li>
                <div class="bullet pink"></div>
                <div class="time">5pm</div>
                <div class="desc">
                    <h3>New Icon</h3>
                    <h4>Mobile App</h4>
                </div>
            </li>
<!--            second element-->
            <li>
                <div class="bullet green"></div>
                <div class="time">3 - 4pm</div>
                <div class="desc">
                    <h3>Design Stand Up</h3>
                    <h4>Hangouts</h4>
                </div>
            </li>
<!--            fourth element-->
            <li>
                <div class="bullet orange"></div>
                <div class="time">12pm</div>
                <div class="desc">
                    <h3>Lunch Break</h3>
                </div>
            </li>
<!--            last element-->
            <li>
                <div class="bullet green"></div>
                <div class="time">9 - 11am</div>
                <div class="desc">
                    <h3>Finish Home Screen</h3>
                    <h4>Web App</h4>
                </div>
            </li>
<!--            end -->
        </ul>
    </div>
</div>