<template>
  <div class="pr disc-card flex-center"> 
    <!-- <ImageLoader :src="imgUrl" /> -->
    <div class="lyric-box flex-center">
      <Lyric />
    </div>
    <div class="song-disc pr">
      <div class="song-turn wh-100">
        <div class="song-rollwrap">
          <div class="song-img a-circling z-pause"><img :class="isLoading ? 'hide' : 'show'" class="u-img transform wh-100" alt="song-img" :src="imgUrl"></div>
          <div class="song-lgour"><div class="song-light a-circling z-pause"></div></div>
        </div>
      </div>
      <span class="song-plybtn"></span>
    </div>
  </div>
</template>

<script setup>
  // import ImageLoader from "./ImageLoader.vue"
  import Lyric from "../components/Lyric.vue"
  const props = defineProps({
    imgUrl: String,
    isLoading: Boolean
  })
</script>

<style lang="less" scoped>

.song-disc {
  width: 170px;
  height: 170px;
  transform: translateX(-42.5px);
  flex-shrink: 0;
}
.lyric-box {
  overflow: hidden;
  padding: .5rem;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 155px;
  width: 600px;
  max-width: 90%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px) saturate(150%);
  transform: translateX(42.5px);
  flex-shrink: 0;
}

// .song-disc:after {
//   content: " ";
//   position: absolute;
//   top: 10px;
//   left: 107px;
//   z-index: 5;
//   width: 84px;
//   height: 122px;
//   background: url("../assets/images/needle-ab.png") no-repeat;
//   background-size: contain;
// }

.song-turn:before {
  content: " ";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  background: url("../assets/images/disc.png") no-repeat;
  background-size: contain;
}
.song-rollwrap {
    position: absolute;
    width: 150px;
    height: 150px;
    left: 50%;
    top: 50%;
    z-index: 1;
    margin: -75px 0 0 -75px;
}

.song-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: url("../assets/images/disc-bg.png") no-repeat;
    background-size: contain;
}

.song-lgour, .song-light {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
}
.song-light {
    background: url("../assets/images/disc_light.png") no-repeat;
    background-size: contain;
}

.song-plybtn {
    position: absolute;
    width: 10px;
    height: 10px;
    left: 50%;
    top: 50%;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 10px hsla(0, 0, 0, 0.65);
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    z-index: 10;
    // background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAABJlBMVEUAAAAAAAD////l5eX///9iYmKDg4Pn5+f///9YWFj////09PT////4+Pjt7e3///////9oaGhBQUH////////////////CwsIaGhr///8xMTEkJCT////7+/vp6en///////////////+srKyoqKienp58fHz////y8vKTk5P///8EBAT////////////////V1dW3t7f////////////////////v7++jo6N9fX3///////+UlJT////s7Oz////Nzc3///////+RkZGPj495eXkTExP////////29vb////k5OTPz882Njb////////////c3Nz///////9ycnJsbGz///9dXV3////////Q0ND///9QUFD///////////////////9FeiN6AAAAYXRSTlNmAP3c+oWT3ueB9vA19ealRId5EQbuurpu83RxD/nh05dfAquooo+M7JtzaSolE+vMspJ3Wj7w6KSQj6ucKeXNxLWnmpmObVYd8t3axXZRSt7TvbKLideCeSzHnn4V3Nh6YarbPAAABlRJREFUeNrU14lWEmEYh/GXcdj3HQTZRCkS913UNE2zbLd9Oc/930Q2LmVpwPAC03MD/M5835n/IC6dkqHnzcVoZvdkLp2HfHruZDcTXWw+DyVdOilAt6uNjI8782Ua1W2XjTShtdDSmzRdlH6zFKq5bKQBTS5H57gqXJrP1tsb7kShkBPJFQoJ90a7np0vhblqLrrc8R7oQ4vVPZOLIp8mp8flzsanJ59FuMjcqxZdHVKFxvYDWK1lPQXpooInu4ZVYD/m6pAWNLn0DSvvekJ6KLHuxerb0qyrQwrQViV/oZzKSc/lpi6sgUrLdSN16MyWARBcOBWbnS4EAYytj67r1KGtqMUseaSvPCWLGr14u+pDZysmwFhc+i4+BmBWZgcATTXTFvO9qOS3qOlmShu68g7A6xa13F6A7yuq0ORnA9jZENU2dgDjc1IPGvMB4QNR7+AJ4IspQVObBjDmF+Wur6qxmdKAbpeBoEcGlCcIlLf7hx7lOzxOlYeaP+oTmmoYQFsGWhswGql+oMUMEInLgItHgEzRPvS43OHYVY+/fGwXGvIBkzKU6oAvZA8aywOPZEg9AvIxO9AXAZg4lKF1OAGBF71DX5jw5EyG2NkTMJ/3Co2ZcM8tQ819D8xYb9CVgA2nijSw0gs0tArBzk59aRBWQ91Dj30QjssIiofBd9wttFiGiTMZSWcTUC52B629Bg5lRB0Cr2tdQRvAfRlZ94FGN9AjA+oywupgHHWGzuRhTEbaGORnOkFTZYj4ZaT5I1BOdYBuAnEZcXFg89/QmAFtGXltMGL/ghZ9I7+g19fUV/wHtAJBvzggfxAqd0NXDPCII/KAsXIXNPXOIQd/efjvUndAmxB2xMH/zB+G5u3Qr2k4EMd0AOmvt0IrsCMOagcqt0FbJkyLg5oGs3ULNApecVReiP4NnTHALY7KDcbHv6BbDno1XTUGW39CWwa8F4flB6P1B3TRgQ/UeqSLN6GzAQd83f1dHAKzN6AfoCQOrARLN6Andr9GpiITT9/KwPLAye/QGATFTusAxsOCDKogxH6D7sOC2GkNq+B9GVALsP8LWgzAqdjJ4LJXCRlIpxAoXkOrtteT6yYmH8gg8kL1GroHU/1CoTSQBZ6CvSto0oRc/1DM7GNRLwdm8hK6DF5RgMI9j6jnheVLaBTWdaAwPy7KrUP0Alqbg4QWlPCU6JaAuZoFDcGaqEHh6RdRLQIhC/oBsppQzAXVN1UWlixoBjyqUIhozr8H3vyE1lYhpwnVnv8CpH9CZyAi2lAIPtK8pDPn0Cp8UoWqz/8zqJ5DGzCpCdWf/0lonEMzMK0J1Z//acicQ30wrgnVn/9x8LkkCWFRherPfxiSEgKvLlR//r0QkmWY14Xqz/88LEsTsqpQ/fm3RlQWoa4L1Z//OixKFNq6UP35vw9RycDGMKAYD3P9vEhlF9y6UP35d8OuvISELlR//hPwUqxh0oTqz781TbIKueFB4em4rb/Mq5IfMpRn0nOPIS+ADBUatvcz/w/0B/X2VgMACMNQ9AMnWOADKwT/QuahyZYcDcte7e146X9W+vFmWmEzOeOJGfjMCmWOEubMYw7no7wizHPHvMuMAMFIOo5IxsiOjJDLSOOM2cDYN44hxliMjGnL2OAOWMCgGgz84uBEDKDFIG8ORLhzLPO2Y5kK6PpMdJiBsR28nQkMOBEMJtTixISY4JUTZWPCgVXevesgCINhGG7dZPLEIg7GRRsMTsaoMTEOnmLUuBgn+e//JuTHGt0aKT3y3QIFpj6vO9ctnbnAmr9PIysefn0E0PfhkjW92HFtnQHULn5AAG9aISZGF3NaQYxVrInRrcVYBW4H5vkPEPIfuIV5UGXhClHT8Qv9oXQ/MckoTfb+wVTGqK8ZUl9+4mmUnpGj03pOmzlH5y/w5w6ZiAil+G9qA0KpkfWMTxKsJ6530wel3try9CwjSscg27BTDcw321gHjzyuEjj9IbwP1hPeDqHo2abP0pn5XMR/NhTB/fyo2gv3q0gh1JSkEHCrUuMSG1VxCdxDOtfR1ZDr4AGUwIUACi5JJZMyx1RHUgY3kIn0LBuFQk2EFlv7J3t0+id7JPi86wlJsfm9FUVbQrZR1LrPmQ0hKZfSXC7Fzr5LeD7uGoYBQBCGV56PS2g5ewGy+NkUNbjr9gAAAABJRU5ErkJggg==) 0 0 no-repeat;
    background-size: contain;
}

@media(max-width: 768px) {
  .song-disc {
    width: 120px;
    height: 120px;
    transform: translateX(-30px);
  }
  .song-plybtn {
    width: 30px;
    height: 30px;
  }
  .song-rollwrap {
    width: 100px;
    height: 100px;
    margin: -50px 0px 0px -50px;
  }
  .lyric-box {
    height: 110px;
    width: calc(100% - 50px);
    max-width: 100%;
    transform: translateX(30px);
    flex-shrink: 0;
  }
}

.a-circling {
    -webkit-animation: circling 20s linear infinite;
    animation: circling 20s linear infinite;
}
.a-circling.z-pause {
    -webkit-animation-play-state: paused!important;
    animation-play-state: paused!important;
}
@-webkit-keyframes circling {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

@keyframes circling {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

.a-circling {
    -webkit-animation: circling 20s linear infinite;
    animation: circling 20s linear infinite
}

.a-circling.z-pause {
    -webkit-animation-play-state: paused!important;
    animation-play-state: paused!important
}

</style>