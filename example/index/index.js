import regeneratorRuntime from 'regenerator-runtime'

// const { createScopedThreejs } = require('threejs-miniprogram')
import { createScopedThreejs } from 'threejs-miniprogram'

const { renderCube } = require('../test-cases/cube')
const { renderCubes } = require('../test-cases/cubes')
const { renderSphere } = require('../test-cases/sphere')
const { renderModel } = require('../test-cases/model')

const app = getApp()

Page({
  data: {},
  onLoad: function () {

      // console.log(regeneratorRuntime)

    wx.createSelectorQuery()
      .select('#webgl')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        this.canvas = canvas
        const THREE = createScopedThreejs(canvas)
          console.log('THREE.REVISION',THREE.REVISION)
          // v 144 测试通过；
        // renderSphere(canvas, THREE)
          // v 144 测试通过；
        // renderCube(canvas, THREE)
          // v 144 测试通过；
        // renderCubes(canvas, THREE)
        renderModel(canvas, THREE)
          console.log(THREE)
      })
  },
  touchStart(e) {
    this.canvas.dispatchTouchEvent({...e, type:'touchstart'})
  },
  touchMove(e) {
    this.canvas.dispatchTouchEvent({...e, type:'touchmove'})
  },
  touchEnd(e) {
    this.canvas.dispatchTouchEvent({...e, type:'touchend'})
  }
})
