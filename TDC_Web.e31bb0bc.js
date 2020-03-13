// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/store.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const seasonDefault = {
  season1: {
    color: "rgb(255, 0, 255)",
    colorArray: [255.0 / 255.0, 0.0, 255.0 / 255.0],
    foodConsumption: 0.2,
    population: 0.2,
    temperature: 0.25
  },
  season2: {
    color: "rgb(0, 255, 255)",
    colorArray: [0.0, 255.0 / 255.0, 255.0 / 255.0],
    foodConsumption: 0.4,
    population: 0.4,
    temperature: 0.5
  },
  season3: {
    color: "rgb(0, 0, 255)",
    colorArray: [0.0, 0.0, 255.0 / 255.0],
    foodConsumption: 0.6,
    population: 0.6,
    temperature: 0.75
  },
  season4: {
    color: "rgb(198, 156, 109)",
    colorArray: [198.0 / 255.0, 156.0 / 255.0, 109 / 255.0],
    foodConsumption: 0.8,
    population: 0.8,
    temperature: 1.0
  }
};

class Store {
  constructor() {
    _defineProperty(this, "updateActiveSeason", season => {
      this.activeSeason = season;
    });

    _defineProperty(this, "updateSlider", (key, value) => {
      this.seasons[`season${this.activeSeason}`][key] = value;
    });

    _defineProperty(this, "updateColor", (value, rgb) => {
      this.seasons[`season${this.activeSeason}`].color = value;
      this.seasons[`season${this.activeSeason}`].colorArray = normalizeColor(rgb);
    });

    _defineProperty(this, "updateBackground", (value, rgb) => {
      this.background = value;
      this.backgroundArray = normalizeColor(rgb);
    });

    _defineProperty(this, "getSliderValue", (type, season) => {
      return this.seasons[`season${season ? season : this.activeSeason}`][type];
    });

    _defineProperty(this, "getColor", season => {
      return this.seasons[`season${season}`].colorArray;
    });

    _defineProperty(this, "getBackground", () => {
      return this.backgroundArray;
    });

    this.activeSeason = "1";
    this.seasons = seasonDefault;
    this.background = "rgb(0, 0, 0)";
    this.backgroundArray = [0.0, 0.0, 0.0];
    this.seasonsLength = Object.keys(seasonDefault).length;
  }

}

exports.default = Store;

const normalizeColor = ({
  r,
  g,
  b
}) => {
  return [r / 255.0, g / 255.0, b / 255.0];
};
},{}],"shaders/fs-blend.glsl":[function(require,module,exports) {
module.exports = "\nprecision mediump float;\n#define GLSLIFY 1\n\nuniform vec2 resolution;\nuniform vec2 textureSize;\nuniform float sliderValue;\nuniform vec3 clearColor;\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform sampler2D texture3;\nuniform sampler2D texture4;\n\nvoid main() {        \n    vec2 fragCoord = gl_FragCoord.xy;\n\tvec2 uv = fragCoord / resolution;\n\n    vec4 samples[4];\n    samples[0] = texture2D(texture4, uv);\n    samples[1] = texture2D(texture3, uv);\n    samples[2] = texture2D(texture2, uv);\n    samples[3] = texture2D(texture1, uv);\n    \n    vec4 color = vec4(0.0);\n\n    if (sliderValue == 0.0) {\n        color += samples[0].a * samples[0];\n        color += samples[1].a * samples[1];\n        color += samples[2].a * samples[2];\n        color += samples[3].a * samples[3];\n    }\n\n    if (sliderValue == 0.25) {\n        color += samples[0].a * samples[0] * vec4(0.32, 0.55, 0.9, 1.0);\n        color += samples[1].a * samples[1] * vec4(1.0, 0.45, 0.1, 1.0);\n        color += samples[2].a * samples[2] * vec4(0.66, 0.99, 0.2, 1.0);\n        color += samples[3].a * samples[3] * vec4(1.0, 1.0, 0.0, 1.0);\n    }\n\n    if (sliderValue == 0.5) {\n        color += samples[0].a * samples[0];\n        color = color * (1.0 - samples[1].a);\n        color += samples[1].a * samples[1];\n        color = color * (1.0 - samples[2].a);\n        color += samples[2].a  * samples[2];\n        color = color * (1.0 - samples[3].a);\n        color += samples[3].a * samples[3];\n    }\n\n    if (sliderValue == 0.75) {\n        color += samples[0].a * samples[0] * vec4(0.6, 1.0, 0.8, 1.0);\n        color += samples[1].a * samples[1] * vec4(0.75, 0.25, 0.75, 1.0);\n        color += samples[2].a * samples[2] * vec4(0.99, 0.18, 0.0, 1.0);\n        color += samples[3].a * samples[3] * vec4(0.0, 0.35, 0.75, 1.0);\n    }\n\n    if (sliderValue == 1.0) {\n        color += samples[0].a * samples[0] * vec4(0.86, 0.55, 0.86, 1.0);\n        color += samples[1].a * samples[1] * vec4(0.25, 0.67, 1.0, 1.0);\n        color += samples[2].a * samples[2] * vec4(0.82, 0.56, 0.0, 1.0);\n        color += samples[3].a * samples[3] * vec4(0.42, 0.82, 0.62, 1.0);\n    } \n\n    gl_FragColor = color;\n}\n";
},{}],"shaders/fs-distort.glsl":[function(require,module,exports) {
module.exports = "\nprecision mediump float;\n#define GLSLIFY 1\n\nuniform vec2 resolution;\nuniform vec2 textureSize;\nuniform vec2 sliderValues;\nuniform vec3 clearColor;\nuniform vec3 selectedColor;\nuniform sampler2D lettersTexture;\nuniform sampler2D linesTexture;\n\nvoid main() {        \n    vec2 fragCoord = gl_FragCoord.xy;\n    vec2 uv = fragCoord / resolution;\n\n    vec2 centerUV = uv - 0.5;\n    float curveDirection = centerUV.x / abs(centerUV.x);\n\n    vec2 texCoord = fragCoord / resolution;\n    float distanceToCenter = distance(texCoord, vec2(0.5));\n\n    if (texCoord.x >= 0.5) {\n        uv.x /= 1.0 + 0.1 * sliderValues.x;\n        uv.x -= 0.15 * sliderValues.x;\n        uv.x += distanceToCenter * 4. * sliderValues.x;\n        uv.x = max(uv.x, 0.5);\n    } else {\n        uv.x /= 1.0 + 0.1 * sliderValues.x;\n        uv.x += 0.25 * sliderValues.x;\n        uv.x -= distanceToCenter * 4. * sliderValues.x;\n        uv.x = min(0.5, uv.x);\n    }\n\n    vec4 lettersSample = texture2D(lettersTexture, uv);\n    vec4 linesSample = texture2D(linesTexture, uv);\n\n    if(linesSample.r <= abs(sliderValues.y)) {\n        lettersSample.a = 0.0;\n    } \n    \n    gl_FragColor = vec4(mix(clearColor, selectedColor.rgb, lettersSample.r), lettersSample.a);\n}";
},{}],"shaders/vs.glsl":[function(require,module,exports) {
module.exports = "#define GLSLIFY 1\nattribute vec2 position;\n\nvoid main()\n{        \n  gl_Position = vec4(position, 0.0, 1.0);\n}\n\n";
},{}],"js/gl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsBlend = _interopRequireDefault(require("../shaders/fs-blend.glsl"));

var _fsDistort = _interopRequireDefault(require("../shaders/fs-distort.glsl"));

var _vs = _interopRequireDefault(require("../shaders/vs.glsl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GL {
  constructor(_canvas, _store, lettersImage, linesImage) {
    _defineProperty(this, "initialize", () => {
      this.configureGL();
      this.configureBuffers();
      this.createPrograms();
      this.setAttributeLocations();
      this.configureTextures();
      this.createFramebuffers();
      this.draw();
    });

    _defineProperty(this, "configureGL", () => {
      const {
        backgroundArray
      } = this.store;
      this.gl = this.canvas.getContext("webgl", {
        preserveDrawingBuffer: true
      });

      if (!this.gl) {
        alert("Your browser does not support WebGL");
      }

      this.gl.clearColor(backgroundArray[0], backgroundArray[1], backgroundArray[2], 1.0);
    });

    _defineProperty(this, "configureBuffers", () => {
      const {
        gl
      } = this;
      this.vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      const quadVertices = new Float32Array([-1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0]);
      gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    });

    _defineProperty(this, "createPrograms", () => {
      const {
        gl
      } = this;
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, _vs.default);
      gl.compileShader(vertexShader);
      const distortFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(distortFragmentShader, _fsDistort.default);
      gl.compileShader(distortFragmentShader);
      const distortProgram = gl.createProgram();
      this.distortProgram = distortProgram;
      gl.attachShader(distortProgram, vertexShader);
      gl.attachShader(distortProgram, distortFragmentShader);
      gl.linkProgram(distortProgram);

      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error(`Error compiling vertex shader`, gl.getShaderInfoLog(vertexShader));
        return;
      }

      if (!gl.getShaderParameter(distortFragmentShader, gl.COMPILE_STATUS)) {
        console.error(`Error compiling distort fragment shader`, gl.getShaderInfoLog(distortFragmentShader));
        return;
      }

      const blendFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(blendFragmentShader, _fsBlend.default);
      gl.compileShader(blendFragmentShader);
      const blendProgram = gl.createProgram();
      this.blendProgram = blendProgram;
      gl.attachShader(blendProgram, vertexShader);
      gl.attachShader(blendProgram, blendFragmentShader);
      gl.linkProgram(blendProgram);

      if (!gl.getShaderParameter(blendFragmentShader, gl.COMPILE_STATUS)) {
        console.error(`Error compiling blend fragment shader`, gl.getShaderInfoLog(blendFragmentShader));
        return;
      }
    });

    _defineProperty(this, "setAttributeLocations", () => {
      const {
        gl,
        distortProgram,
        blendProgram
      } = this;
      distortProgram.resolutionLocation = gl.getUniformLocation(distortProgram, "resolution");
      distortProgram.textureSizeLocation = gl.getUniformLocation(distortProgram, "textureSize");
      distortProgram.sliderValuesLocation = gl.getUniformLocation(distortProgram, "sliderValues");
      distortProgram.clearColorLocation = gl.getUniformLocation(distortProgram, "clearColor");
      distortProgram.selectedColorLocation = gl.getUniformLocation(distortProgram, "selectedColor");
      distortProgram.positionLocation = gl.getAttribLocation(distortProgram, "position");
      distortProgram.lettersTextureLocation = gl.getUniformLocation(distortProgram, "lettersTexture");
      distortProgram.linesTextureLocation = gl.getUniformLocation(distortProgram, "linesTexture");
      blendProgram.resolutionLocation = gl.getUniformLocation(blendProgram, "resolution");
      blendProgram.sliderValueLocation = gl.getUniformLocation(blendProgram, "sliderValue");
      blendProgram.positionLocation = gl.getAttribLocation(blendProgram, "position");
      blendProgram.clearColorLocation = gl.getUniformLocation(blendProgram, "clearColor");
      blendProgram.texture1Location = gl.getUniformLocation(blendProgram, "texture1");
      blendProgram.texture2Location = gl.getUniformLocation(blendProgram, "texture2");
      blendProgram.texture3Location = gl.getUniformLocation(blendProgram, "texture3");
      blendProgram.texture4Location = gl.getUniformLocation(blendProgram, "texture4");
    });

    _defineProperty(this, "textCanvas", () => {
      this.textCanvas = document.getElementById("textCanvas");
      const textContext = textCanvas.getContext("2d");
      textCanvas.style.display = "none";
      textCanvas.width = this.canvas.width;
      textCanvas.height = this.canvas.height;
      textContext.font = "400px impact";
      textContext.textAlign = "center";
      textContext.textBaseline = "middle";
      textContext.globalAlpha = 0.0;
      textContext.fillRect(0, 0, textCanvas.width, textCanvas.height);
      textContext.fillStyle = "white";
      textContext.strokeStyle = "gray";
      textContext.lineWidth = 1;
      textContext.globalAlpha = 1.0;
      textContext.fillText("T D C", textCanvas.width / 2, textCanvas.height / 2);
      textContext.strokeText("T D C", textCanvas.width / 2, textCanvas.height / 2);
      return textCanvas;
    });

    _defineProperty(this, "configureTextures", () => {
      const {
        gl
      } = this;
      this.lettersTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.lettersTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textCanvas());
      gl.bindTexture(gl.TEXTURE_2D, null);
      this.linesTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.linesTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.linesImage);
      gl.bindTexture(gl.TEXTURE_2D, null);
    });

    _defineProperty(this, "createFramebuffers", () => {
      const {
        gl,
        store
      } = this;
      let framebufferTexture, framebuffer;
      this.framebufferTextures = [];
      this.framebuffers = [];

      for (let i = 0; i < store.seasonsLength; i++) {
        framebufferTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, framebufferTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        this.framebufferTextures.push(framebufferTexture);
        gl.bindTexture(gl.TEXTURE_2D, null);
        framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, framebufferTexture, 0);
        this.framebuffers.push(framebuffer);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
    });

    _defineProperty(this, "bindTexture", (texture, location, index) => {
      const {
        gl
      } = this;
      gl.uniform1i(location, index);
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, texture);
    });

    _defineProperty(this, "draw", () => {
      const {
        gl,
        distortProgram,
        blendProgram,
        store,
        framebuffers,
        framebufferTextures,
        bindTexture,
        lettersTexture,
        linesTexture,
        vertexBuffer,
        lettersImage
      } = this;

      const loop = () => {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(distortProgram);

        for (let i = 0; i < store.seasonsLength; i++) {
          gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffers[i]);
          gl.clear(gl.COLOR_BUFFER_BIT);
          bindTexture(lettersTexture, distortProgram.lettersTextureLocation, 0);
          bindTexture(linesTexture, distortProgram.linesTextureLocation, 1);
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
          gl.enableVertexAttribArray(distortProgram.positionLocation);
          gl.vertexAttribPointer(distortProgram.positionLocation, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
          gl.uniform2f(distortProgram.resolutionLocation, this.canvas.width, this.canvas.height);
          gl.uniform2f(distortProgram.textureSizeLocation, this.textCanvas.width, this.textCanvas.height);
          gl.uniform2fv(distortProgram.sliderValuesLocation, [store.getSliderValue("foodConsumption", i + 1), store.getSliderValue("population", i + 1)]);
          gl.uniform3fv(distortProgram.selectedColorLocation, store.getColor(i + 1));
          gl.uniform3fv(distortProgram.clearColorLocation, store.getBackground());
          gl.bindBuffer(gl.ARRAY_BUFFER, null);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }

        gl.useProgram(blendProgram);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        bindTexture(framebufferTextures[0], blendProgram.texture1Location, 0);
        bindTexture(framebufferTextures[1], blendProgram.texture2Location, 1);
        bindTexture(framebufferTextures[2], blendProgram.texture3Location, 2);
        bindTexture(framebufferTextures[3], blendProgram.texture4Location, 3);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.enableVertexAttribArray(blendProgram.positionLocation);
        gl.vertexAttribPointer(blendProgram.positionLocation, 2, gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.uniform2f(blendProgram.resolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(blendProgram.sliderValueLocation, store.getSliderValue("temperature"));
        gl.uniform3fv(blendProgram.clearColorLocation, store.getBackground());
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(loop);
      };

      requestAnimationFrame(loop);
    });

    this.canvas = _canvas;
    this.store = _store;
    this.lettersImage = lettersImage;
    this.linesImage = linesImage;
  }

}

exports.default = GL;
},{"../shaders/fs-blend.glsl":"shaders/fs-blend.glsl","../shaders/fs-distort.glsl":"shaders/fs-distort.glsl","../shaders/vs.glsl":"shaders/vs.glsl"}],"images/lines.png":[function(require,module,exports) {
module.exports = "/lines.d2aef6a2.png";
},{}],"images/letters.png":[function(require,module,exports) {
module.exports = "/letters.d59d4158.png";
},{}],"node_modules/@jaames/iro/dist/iro.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * iro.js v5.0.0
 * 2016-2019 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */
var n,
    u,
    t,
    i,
    r,
    o,
    f = {},
    e = [],
    c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;

function s(n, l) {
  for (var u in l) {
    n[u] = l[u];
  }

  return n;
}

function a(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function h(n, l, u) {
  var t,
      i,
      r,
      o,
      f = arguments;

  if (l = s({}, l), arguments.length > 3) {
    for (u = [u], t = 3; t < arguments.length; t++) {
      u.push(f[t]);
    }
  }

  if (null != u && (l.children = u), null != n && null != n.defaultProps) {
    for (i in n.defaultProps) {
      void 0 === l[i] && (l[i] = n.defaultProps[i]);
    }
  }

  return o = l.key, null != (r = l.ref) && delete l.ref, null != o && delete l.key, v(n, l, o, r);
}

function v(l, u, t, i) {
  var r = {
    type: l,
    props: u,
    key: t,
    ref: i,
    __k: null,
    __p: null,
    __b: 0,
    __e: null,
    l: null,
    __c: null,
    constructor: void 0
  };
  return n.vnode && n.vnode(r), r;
}

function d(n) {
  return n.children;
}

function y(n) {
  if (null == n || "boolean" == typeof n) {
    return null;
  }

  if ("string" == typeof n || "number" == typeof n) {
    return v(null, n, null, null);
  }

  if (null != n.__e || null != n.__c) {
    var l = v(n.type, n.props, n.key, null);
    return l.__e = n.__e, l;
  }

  return n;
}

function m(n, l) {
  this.props = n, this.context = l;
}

function w(n, l) {
  if (null == l) {
    return n.__p ? w(n.__p, n.__p.__k.indexOf(n) + 1) : null;
  }

  for (var u; l < n.__k.length; l++) {
    if (null != (u = n.__k[l]) && null != u.__e) {
      return u.__e;
    }
  }

  return "function" == typeof n.type ? w(n) : null;
}

function g(n) {
  var l, u;

  if (null != (n = n.__p) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
      if (null != (u = n.__k[l]) && null != u.__e) {
        n.__e = n.__c.base = u.__e;
        break;
      }
    }

    return g(n);
  }
}

function k(l) {
  (!l.__d && (l.__d = !0) && 1 === u.push(l) || i !== n.debounceRendering) && (i = n.debounceRendering, (n.debounceRendering || t)(_));
}

function _() {
  var n, l, t, i, r, o, f, e;

  for (u.sort(function (n, l) {
    return l.__v.__b - n.__v.__b;
  }); n = u.pop();) {
    n.__d && (t = void 0, i = void 0, o = (r = (l = n).__v).__e, f = l.__P, e = l.u, l.u = !1, f && (t = [], i = $(f, r, s({}, r), l.__n, void 0 !== f.ownerSVGElement, null, t, e, null == o ? w(r) : o), j(t, r), i != o && g(r)));
  }
}

function b(n, l, u, t, i, r, o, c, s) {
  var h,
      v,
      p,
      d,
      y,
      m,
      g,
      k = u && u.__k || e,
      _ = k.length;

  if (c == f && (c = null != r ? r[0] : _ ? w(u, 0) : null), h = 0, l.__k = x(l.__k, function (u) {
    if (null != u) {
      if (u.__p = l, u.__b = l.__b + 1, null === (p = k[h]) || p && u.key == p.key && u.type === p.type) {
        k[h] = void 0;
      } else {
        for (v = 0; v < _; v++) {
          if ((p = k[v]) && u.key == p.key && u.type === p.type) {
            k[v] = void 0;
            break;
          }

          p = null;
        }
      }

      if (d = $(n, u, p = p || f, t, i, r, o, null, c, s), (v = u.ref) && p.ref != v && (g || (g = [])).push(v, u.__c || d, u), null != d) {
        if (null == m && (m = d), null != u.l) {
          d = u.l, u.l = null;
        } else if (r == p || d != c || null == d.parentNode) {
          n: if (null == c || c.parentNode !== n) {
            n.appendChild(d);
          } else {
            for (y = c, v = 0; (y = y.nextSibling) && v < _; v += 2) {
              if (y == d) {
                break n;
              }
            }

            n.insertBefore(d, c);
          }

          "option" == l.type && (n.value = "");
        }

        c = d.nextSibling, "function" == typeof l.type && (l.l = d);
      }
    }

    return h++, u;
  }), l.__e = m, null != r && "function" != typeof l.type) {
    for (h = r.length; h--;) {
      null != r[h] && a(r[h]);
    }
  }

  for (h = _; h--;) {
    null != k[h] && D(k[h], k[h]);
  }

  if (g) {
    for (h = 0; h < g.length; h++) {
      A(g[h], g[++h], g[++h]);
    }
  }
}

function x(n, l, u) {
  if (null == u && (u = []), null == n || "boolean" == typeof n) {
    l && u.push(l(null));
  } else if (Array.isArray(n)) {
    for (var t = 0; t < n.length; t++) {
      x(n[t], l, u);
    }
  } else {
    u.push(l ? l(y(n)) : n);
  }

  return u;
}

function C(n, l, u, t, i) {
  var r;

  for (r in u) {
    r in l || N(n, r, null, u[r], t);
  }

  for (r in l) {
    i && "function" != typeof l[r] || "value" === r || "checked" === r || u[r] === l[r] || N(n, r, l[r], u[r], t);
  }
}

function P(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === c.test(l) ? u + "px" : null == u ? "" : u;
}

function N(n, l, u, t, i) {
  var r, o, f, e, c;
  if ("key" === (l = i ? "className" === l ? "class" : l : "class" === l ? "className" : l) || "children" === l) ;else if ("style" === l) {
    if (r = n.style, "string" == typeof u) {
      r.cssText = u;
    } else {
      if ("string" == typeof t && (r.cssText = "", t = null), t) {
        for (o in t) {
          u && o in u || P(r, o, "");
        }
      }

      if (u) {
        for (f in u) {
          t && u[f] === t[f] || P(r, f, u[f]);
        }
      }
    }
  } else {
    "o" === l[0] && "n" === l[1] ? (e = l !== (l = l.replace(/Capture$/, "")), c = l.toLowerCase(), l = (c in n ? c : l).slice(2), u ? (t || n.addEventListener(l, T, e), (n.t || (n.t = {}))[l] = u) : n.removeEventListener(l, T, e)) : "list" !== l && "tagName" !== l && "form" !== l && !i && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u ? n.removeAttribute(l) : n.setAttribute(l, u));
  }
}

function T(l) {
  return this.t[l.type](n.event ? n.event(l) : l);
}

function $(l, u, t, i, r, o, f, e, c, a) {
  var h,
      v,
      p,
      y,
      w,
      g,
      k,
      _,
      C,
      P,
      N = u.type;

  if (void 0 !== u.constructor) {
    return null;
  }

  (h = n.__b) && h(u);

  try {
    n: if ("function" == typeof N) {
      if (_ = u.props, C = (h = N.contextType) && i[h.__c], P = h ? C ? C.props.value : h.__p : i, t.__c ? k = (v = u.__c = t.__c).__p = v.__E : ("prototype" in N && N.prototype.render ? u.__c = v = new N(_, P) : (u.__c = v = new m(_, P), v.constructor = N, v.render = H), C && C.sub(v), v.props = _, v.state || (v.state = {}), v.context = P, v.__n = i, p = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != N.getDerivedStateFromProps && s(v.__s == v.state ? v.__s = s({}, v.__s) : v.__s, N.getDerivedStateFromProps(_, v.__s)), p) {
        null == N.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && f.push(v);
      } else {
        if (null == N.getDerivedStateFromProps && null == e && null != v.componentWillReceiveProps && v.componentWillReceiveProps(_, P), !e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(_, v.__s, P)) {
          for (v.props = _, v.state = v.__s, v.__d = !1, v.__v = u, u.__e = null != c ? c !== t.__e ? c : t.__e : null, u.__k = t.__k, h = 0; h < u.__k.length; h++) {
            u.__k[h] && (u.__k[h].__p = u);
          }

          break n;
        }

        null != v.componentWillUpdate && v.componentWillUpdate(_, v.__s, P);
      }

      for (y = v.props, w = v.state, v.context = P, v.props = _, v.state = v.__s, (h = n.__r) && h(u), v.__d = !1, v.__v = u, v.__P = l, h = v.render(v.props, v.state, v.context), u.__k = x(null != h && h.type == d && null == h.key ? h.props.children : h), null != v.getChildContext && (i = s(s({}, i), v.getChildContext())), p || null == v.getSnapshotBeforeUpdate || (g = v.getSnapshotBeforeUpdate(y, w)), b(l, u, t, i, r, o, f, c, a), v.base = u.__e; h = v.__h.pop();) {
        v.__s && (v.state = v.__s), h.call(v);
      }

      p || null == y || null == v.componentDidUpdate || v.componentDidUpdate(y, w, g), k && (v.__E = v.__p = null);
    } else {
      u.__e = z(t.__e, u, t, i, r, o, f, a);
    }

    (h = n.diffed) && h(u);
  } catch (l) {
    n.__e(l, u, t);
  }

  return u.__e;
}

function j(l, u) {
  for (var t; t = l.pop();) {
    try {
      t.componentDidMount();
    } catch (l) {
      n.__e(l, t.__v);
    }
  }

  n.__c && n.__c(u);
}

function z(n, l, u, t, i, r, o, c) {
  var s,
      a,
      h,
      v,
      p = u.props,
      d = l.props;

  if (i = "svg" === l.type || i, null == n && null != r) {
    for (s = 0; s < r.length; s++) {
      if (null != (a = r[s]) && (null === l.type ? 3 === a.nodeType : a.localName === l.type)) {
        n = a, r[s] = null;
        break;
      }
    }
  }

  if (null == n) {
    if (null === l.type) {
      return document.createTextNode(d);
    }

    n = i ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type), r = null;
  }

  return null === l.type ? p !== d && (null != r && (r[r.indexOf(n)] = null), n.data = d) : l !== u && (null != r && (r = e.slice.call(n.childNodes)), h = (p = u.props || f).dangerouslySetInnerHTML, v = d.dangerouslySetInnerHTML, c || (v || h) && (v && h && v.__html == h.__html || (n.innerHTML = v && v.__html || "")), C(n, d, p, i, c), l.__k = l.props.children, v || b(n, l, u, t, "foreignObject" !== l.type && i, r, o, f, c), c || ("value" in d && void 0 !== d.value && d.value !== n.value && (n.value = null == d.value ? "" : d.value), "checked" in d && void 0 !== d.checked && d.checked !== n.checked && (n.checked = d.checked))), n;
}

function A(l, u, t) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, t);
  }
}

function D(l, u, t) {
  var i, r, o;

  if (n.unmount && n.unmount(l), (i = l.ref) && A(i, null, u), t || "function" == typeof l.type || (t = null != (r = l.__e)), l.__e = l.l = null, null != (i = l.__c)) {
    if (i.componentWillUnmount) {
      try {
        i.componentWillUnmount();
      } catch (l) {
        n.__e(l, u);
      }
    }

    i.base = i.__P = null;
  }

  if (i = l.__k) {
    for (o = 0; o < i.length; o++) {
      i[o] && D(i[o], u, t);
    }
  }

  null != r && a(r);
}

function H(n, l, u) {
  return this.constructor(n, u);
}

function I(l, u, t) {
  var i, o, c;
  n.__p && n.__p(l, u), o = (i = t === r) ? null : t && t.__k || u.__k, l = h(d, null, [l]), c = [], $(u, i ? u.__k = l : (t || u).__k = l, o || f, f, void 0 !== u.ownerSVGElement, t && !i ? [t] : o ? null : e.slice.call(u.childNodes), c, !1, t || f, i), j(c, l);
}

n = {}, m.prototype.setState = function (n, l) {
  var u = this.__s !== this.state && this.__s || (this.__s = s({}, this.state));
  ("function" != typeof n || (n = n(u, this.props))) && s(u, n), null != n && this.__v && (this.u = !1, l && this.__h.push(l), k(this));
}, m.prototype.forceUpdate = function (n) {
  this.__v && (n && this.__h.push(n), this.u = !0, k(this));
}, m.prototype.render = d, u = [], t = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, i = n.debounceRendering, n.__e = function (n, l, u) {
  for (var t; l = l.__p;) {
    if ((t = l.__c) && !t.__p) {
      try {
        if (t.constructor && null != t.constructor.getDerivedStateFromError) {
          t.setState(t.constructor.getDerivedStateFromError(n));
        } else {
          if (null == t.componentDidCatch) {
            continue;
          }

          t.componentDidCatch(n);
        }

        return k(t.__E = t);
      } catch (l) {
        n = l;
      }
    }
  }

  throw n;
}, r = f, o = 0;
var t$1 = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",
    r$1 = "[\\s|\\(]+(" + t$1 + ")[,|\\s]+(" + t$1 + ")[,|\\s]+(" + t$1 + ")\\s*\\)?",
    n$1 = "[\\s|\\(]+(" + t$1 + ")[,|\\s]+(" + t$1 + ")[,|\\s]+(" + t$1 + ")[,|\\s]+(" + t$1 + ")\\s*\\)?",
    e$1 = new RegExp("rgb" + r$1),
    i$1 = new RegExp("rgba" + n$1),
    a$1 = new RegExp("hsl" + r$1),
    s$1 = new RegExp("hsla" + n$1),
    h$1 = new RegExp("^(?:#?|0x?)([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$"),
    o$1 = new RegExp("^(?:#?|0x?)([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$"),
    u$1 = new RegExp("^(?:#?|0x?)([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$"),
    l = new RegExp("^(?:#?|0x?)([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$"),
    g$1 = Math.log,
    c$1 = Math.round,
    f$1 = Math.floor;

function v$1(t, r) {
  var n = t.indexOf("%") > -1,
      e = parseFloat(t);
  return n ? r / 100 * e : e;
}

function b$1(t) {
  return parseInt(t, 16);
}

function d$1(t) {
  return t.toString(16).padStart(2, "0");
}

var p = function (t, r) {
  this.$ = {
    h: 0,
    s: 0,
    v: 0,
    a: 1
  }, t && this.set(t), this.onChange = r;
},
    x$1 = {
  hsv: {
    configurable: !0
  },
  hsva: {
    configurable: !0
  },
  hue: {
    configurable: !0
  },
  saturation: {
    configurable: !0
  },
  value: {
    configurable: !0
  },
  alpha: {
    configurable: !0
  },
  kelvin: {
    configurable: !0
  },
  rgb: {
    configurable: !0
  },
  rgba: {
    configurable: !0
  },
  hsl: {
    configurable: !0
  },
  hsla: {
    configurable: !0
  },
  rgbString: {
    configurable: !0
  },
  rgbaString: {
    configurable: !0
  },
  hexString: {
    configurable: !0
  },
  hex8String: {
    configurable: !0
  },
  hslString: {
    configurable: !0
  },
  hslaString: {
    configurable: !0
  }
};

p.prototype.set = function (t) {
  if ("string" == typeof t) {
    /^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(t) ? this.hexString = t : /^rgba?/.test(t) ? this.rgbString = t : /^hsla?/.test(t) && (this.hslString = t);
  } else {
    if ("object" != typeof t) {
      throw new Error("Invalid color value");
    }

    t instanceof p ? this.hsv = t.hsv : "object" == typeof t && "r" in t && "g" in t && "b" in t ? this.rgb = t : "object" == typeof t && "h" in t && "s" in t && "v" in t ? this.hsv = t : "object" == typeof t && "h" in t && "s" in t && "l" in t && (this.hsl = t);
  }
}, p.prototype.setChannel = function (t, r, n) {
  var e;
  this[t] = Object.assign({}, this[t], ((e = {})[r] = n, e));
}, p.prototype.clone = function () {
  return new p(this);
}, p.hsvToRgb = function (t) {
  var r = t.h / 60,
      n = t.s / 100,
      e = t.v / 100,
      i = f$1(r),
      a = r - i,
      s = e * (1 - n),
      h = e * (1 - a * n),
      o = e * (1 - (1 - a) * n),
      u = i % 6;
  return {
    r: 255 * [e, h, s, s, o, e][u],
    g: 255 * [o, e, e, h, s, s][u],
    b: 255 * [s, s, o, e, e, h][u]
  };
}, p.rgbToHsv = function (t) {
  var r = t.r / 255,
      n = t.g / 255,
      e = t.b / 255,
      i = Math.max(r, n, e),
      a = Math.min(r, n, e),
      s = i - a,
      h = 0,
      o = i,
      u = 0 === i ? 0 : s / i;

  switch (i) {
    case a:
      h = 0;
      break;

    case r:
      h = (n - e) / s + (n < e ? 6 : 0);
      break;

    case n:
      h = (e - r) / s + 2;
      break;

    case e:
      h = (r - n) / s + 4;
  }

  return {
    h: 60 * h,
    s: 100 * u,
    v: 100 * o
  };
}, p.hsvToHsl = function (t) {
  var r = t.s / 100,
      n = t.v / 100,
      e = (2 - r) * n,
      i = e <= 1 ? e : 2 - e;
  return {
    h: t.h,
    s: 100 * (i < 1e-9 ? 0 : r * n / i),
    l: 50 * e
  };
}, p.hslToHsv = function (t) {
  var r = 2 * t.l,
      n = t.s * (r <= 100 ? r : 200 - r) / 100;
  return {
    h: t.h,
    s: 100 * (r + n < 1e-9 ? 0 : 2 * n / (r + n)),
    v: (r + n) / 2
  };
}, p.kelvinToRgb = function (t) {
  var r,
      n,
      e,
      i = t / 100;
  return i < 66 ? (r = 255, n = -155.25485562709179 - .44596950469579133 * (n = i - 2) + 104.49216199393888 * g$1(n), e = i < 20 ? 0 : .8274096064007395 * (e = i - 10) - 254.76935184120902 + 115.67994401066147 * g$1(e)) : (r = 351.97690566805693 + .114206453784165 * (r = i - 55) - 40.25366309332127 * g$1(r), n = 325.4494125711974 + .07943456536662342 * (n = i - 50) - 28.0852963507957 * g$1(n), e = 255), {
    r: f$1(r),
    g: f$1(n),
    b: f$1(e)
  };
}, p.rgbToKelvin = function (t) {
  for (var r, n = t.r, e = t.b, i = 1e3, a = 4e4; a - i > .4;) {
    var s = p.kelvinToRgb(r = .5 * (a + i));
    s.b / s.r >= e / n ? a = r : i = r;
  }

  return r;
}, x$1.hsv.get = function () {
  var t = this.$;
  return {
    h: t.h,
    s: t.s,
    v: t.v
  };
}, x$1.hsv.set = function (t) {
  var r = this.$;

  if (t = Object.assign({}, r, t), this.onChange) {
    var n = {
      h: !1,
      v: !1,
      s: !1,
      a: !1
    };

    for (var e in r) {
      n[e] = t[e] != r[e];
    }

    this.$ = t, (n.h || n.s || n.v || n.a) && this.onChange(this, n);
  } else {
    this.$ = t;
  }
}, x$1.hsva.get = function () {
  return Object.assign({}, this.$);
}, x$1.hsva.set = function (t) {
  this.hsv = t;
}, x$1.hue.get = function () {
  return this.$.h;
}, x$1.hue.set = function (t) {
  this.hsv = {
    h: t
  };
}, x$1.saturation.get = function () {
  return this.$.s;
}, x$1.saturation.set = function (t) {
  this.hsv = {
    s: t
  };
}, x$1.value.get = function () {
  return this.$.v;
}, x$1.value.set = function (t) {
  this.hsv = {
    v: t
  };
}, x$1.alpha.get = function () {
  return this.$.a;
}, x$1.alpha.set = function (t) {
  this.hsv = Object.assign({}, this.hsv, {
    a: t
  });
}, x$1.kelvin.get = function () {
  return p.rgbToKelvin(this.rgb);
}, x$1.kelvin.set = function (t) {
  this.rgb = p.kelvinToRgb(t);
}, x$1.rgb.get = function () {
  var t = p.hsvToRgb(this.$),
      r = t.g,
      n = t.b;
  return {
    r: c$1(t.r),
    g: c$1(r),
    b: c$1(n)
  };
}, x$1.rgb.set = function (t) {
  this.hsv = Object.assign({}, p.rgbToHsv(t), {
    a: void 0 === t.a ? 1 : t.a
  });
}, x$1.rgba.get = function () {
  return Object.assign({}, this.rgb, {
    a: this.alpha
  });
}, x$1.rgba.set = function (t) {
  this.rgb = t;
}, x$1.hsl.get = function () {
  var t = p.hsvToHsl(this.$),
      r = t.s,
      n = t.l;
  return {
    h: c$1(t.h),
    s: c$1(r),
    l: c$1(n)
  };
}, x$1.hsl.set = function (t) {
  this.hsv = Object.assign({}, p.hslToHsv(t), {
    a: void 0 === t.a ? 1 : t.a
  });
}, x$1.hsla.get = function () {
  return Object.assign({}, this.hsl, {
    a: this.alpha
  });
}, x$1.hsla.set = function (t) {
  this.hsl = t;
}, x$1.rgbString.get = function () {
  var t = this.rgb;
  return "rgb(" + t.r + ", " + t.g + ", " + t.b + ")";
}, x$1.rgbString.set = function (t) {
  var r,
      n,
      a,
      s,
      h = 1;

  if ((r = e$1.exec(t)) ? (n = v$1(r[1], 255), a = v$1(r[2], 255), s = v$1(r[3], 255)) : (r = i$1.exec(t)) && (n = v$1(r[1], 255), a = v$1(r[2], 255), s = v$1(r[3], 255), h = v$1(r[4], 1)), !r) {
    throw new Error("Invalid rgb string");
  }

  this.rgb = {
    r: n,
    g: a,
    b: s,
    a: h
  };
}, x$1.rgbaString.get = function () {
  var t = this.rgba;
  return "rgba(" + t.r + ", " + t.g + ", " + t.b + ", " + t.a + ")";
}, x$1.rgbaString.set = function (t) {
  this.rgbString = t;
}, x$1.hexString.get = function () {
  var t = this.rgb;
  return "#" + d$1(t.r) + d$1(t.g) + d$1(t.b);
}, x$1.hexString.set = function (t) {
  var r,
      n,
      e,
      i,
      a = 255;

  if ((r = h$1.exec(t)) ? (n = 17 * b$1(r[1]), e = 17 * b$1(r[2]), i = 17 * b$1(r[3])) : (r = o$1.exec(t)) ? (n = 17 * b$1(r[1]), e = 17 * b$1(r[2]), i = 17 * b$1(r[3]), a = 17 * b$1(r[4])) : (r = u$1.exec(t)) ? (n = b$1(r[1]), e = b$1(r[2]), i = b$1(r[3])) : (r = l.exec(t)) && (n = b$1(r[1]), e = b$1(r[2]), i = b$1(r[3]), a = b$1(r[4])), !r) {
    throw new Error("Invalid hex string");
  }

  this.rgb = {
    r: n,
    g: e,
    b: i,
    a: a / 255
  };
}, x$1.hex8String.get = function () {
  var t = this.rgba;
  return "#" + d$1(t.r) + d$1(t.g) + d$1(t.b) + d$1(f$1(255 * t.a));
}, x$1.hex8String.set = function (t) {
  this.hexString = t;
}, x$1.hslString.get = function () {
  var t = this.hsl;
  return "hsl(" + t.h + ", " + t.s + "%, " + t.l + "%)";
}, x$1.hslString.set = function (t) {
  var r,
      n,
      e,
      i,
      h = 1;

  if ((r = a$1.exec(t)) ? (n = v$1(r[1], 360), e = v$1(r[2], 100), i = v$1(r[3], 100)) : (r = s$1.exec(t)) && (n = v$1(r[1], 360), e = v$1(r[2], 100), i = v$1(r[3], 100), h = v$1(r[4], 1)), !r) {
    throw new Error("Invalid hsl string");
  }

  this.hsl = {
    h: n,
    s: e,
    l: i,
    a: h
  };
}, x$1.hslaString.get = function () {
  var t = this.hsla;
  return "hsl(" + t.h + ", " + t.s + "%, " + t.l + "%, " + t.a + ")";
}, x$1.hslaString.set = function (t) {
  this.hslString = t;
}, Object.defineProperties(p.prototype, x$1);
var w$1 = {
  sliderShape: "bar",
  sliderType: "value",
  minTemperature: 2200,
  maxTemperature: 11e3
};

function m$1(t) {
  var r;
  return (r = {})["horizontal" === t.layoutDirection ? "marginLeft" : "marginTop"] = t.sliderMargin, r;
}

function S(t) {
  var r = t.width,
      n = t.sliderSize,
      e = t.borderWidth,
      i = t.handleRadius,
      a = t.padding,
      s = "horizontal" === t.layoutDirection;
  return n = n || 2 * a + 2 * i + 2 * e, "circle" === t.sliderShape ? {
    handleStart: t.padding + t.handleRadius,
    handleRange: r - 2 * a - 2 * i - 2 * e,
    width: r,
    height: r,
    cx: r / 2,
    cy: r / 2,
    radius: r / 2 - e / 2
  } : {
    handleStart: n / 2,
    handleRange: r - n,
    radius: n / 2,
    x: 0,
    y: 0,
    width: s ? n : r,
    height: s ? r : n
  };
}

function M(t) {
  var r = t.color.hsva;

  switch (t.sliderType) {
    case "alpha":
      return 100 * r.a;

    case "kelvin":
      var n = t.minTemperature;
      return Math.max(0, Math.min((t.color.kelvin - n) / (t.maxTemperature - n) * 100, 100));

    case "hue":
      return r.h /= 3.6;

    case "saturation":
      return r.s;

    case "value":
    default:
      return r.v;
  }
}

function y$1(t, r, n, e) {
  var i,
      a = S(t),
      s = a.handleRange,
      h = a.handleStart;
  i = "horizontal" === t.layoutDirection ? -1 * (n - e.top) + s + h : r - (e.left + h), i = Math.max(Math.min(i, s), 0);
  var o = Math.round(100 / s * i);

  switch (t.sliderType) {
    case "kelvin":
      var u = t.minTemperature;
      return u + o / 100 * (t.maxTemperature - u);

    case "alpha":
      return o / 100;

    case "hue":
      return 3.6 * o;

    default:
      return o;
  }
}

function T$1(t) {
  var r = S(t),
      n = r.handleRange,
      e = r.handleStart,
      i = "horizontal" === t.layoutDirection,
      a = i ? r.width / 2 : r.height / 2,
      s = e + M(t) / 100 * n;
  return i && (s = -1 * s + n + 2 * e), {
    x: i ? a : s,
    y: i ? s : a
  };
}

function R(t) {
  var r = t.color.hsv;

  switch (t.sliderType) {
    case "alpha":
      var n = t.color.rgb;
      return [[0, "rgba(" + n.r + "," + n.g + "," + n.b + ",0)"], [100, "rgb(" + n.r + "," + n.g + "," + n.b + ")"]];

    case "kelvin":
      for (var e = [], i = t.minTemperature, a = t.maxTemperature, s = a - i, h = i, o = 0; h < a; h += s / 8, o += 1) {
        var u = p.kelvinToRgb(h);
        e.push([12.5 * o, "rgb(" + u.r + "," + u.g + "," + u.b + ")"]);
      }

      return e;

    case "hue":
      return [[0, "#f00"], [16.666, "#ff0"], [33.333, "#0f0"], [50, "#0ff"], [66.666, "#00f"], [83.333, "#f0f"], [100, "#f00"]];

    case "saturation":
      var l = p.hsvToHsl({
        h: r.h,
        s: 0,
        v: r.v
      }),
          g = p.hsvToHsl({
        h: r.h,
        s: 100,
        v: r.v
      });
      return [[0, "hsl(" + l.h + "," + l.s + "%," + l.l + "%)"], [100, "hsl(" + g.h + "," + g.s + "%," + g.l + "%)"]];

    case "value":
    default:
      var c = p.hsvToHsl({
        h: r.h,
        s: r.s,
        v: 100
      });
      return [[0, "#000"], [100, "hsl(" + c.h + "," + c.s + "%," + c.l + "%)"]];
  }
}

function A$1(t) {
  var r = "horizontal" === t.layoutDirection;
  return {
    x1: "0%",
    y1: r ? "100%" : "0%",
    x2: r ? "0%" : "100%",
    y2: "0%"
  };
}

function k$1(t) {
  var r = t.width / 2;
  return {
    width: t.width,
    radius: r - t.borderWidth,
    cx: r,
    cy: r
  };
}

function $$1(t, r) {
  var n = t.wheelAngle;
  return ((r = "clockwise" === t.wheelDirection ? -360 + r - n : n - r) % 360 + 360) % 360;
}

function F(t) {
  var r = t.color.hsv,
      n = k$1(t),
      e = n.cx,
      i = n.cy,
      a = t.width / 2 - t.padding - t.handleRadius - t.borderWidth,
      s = $$1(t, r.h) * (Math.PI / 180),
      h = r.s / 100 * a,
      o = "clockwise" === t.wheelDirection ? -1 : 1;
  return {
    x: e + h * Math.cos(s) * o,
    y: i + h * Math.sin(s) * o
  };
}

function j$1(t, r, n, e) {
  var i = k$1(t),
      a = t.width / 2 - t.padding - t.handleRadius - t.borderWidth;
  r = i.cx - (r - e.left), n = i.cy - (n - e.top);
  var s = $$1(t, Math.atan2(-n, -r) * (180 / Math.PI)),
      h = Math.min(Math.sqrt(r * r + n * n), a);
  return {
    h: Math.round(s),
    s: Math.round(100 / a * h)
  };
}

function E(t) {
  var r;
  return (r = {})["horizontal" === t.layoutDirection ? "marginLeft" : "marginTop"] = t.sliderMargin, r;
}

function D$1(t) {
  var r = t.width;
  return {
    width: r,
    height: r,
    radius: t.padding + t.handleRadius
  };
}

function O(t, r, n, e) {
  var i = D$1(t),
      a = i.radius,
      s = (n -= e.top + a) / (i.height - 2 * a) * 100;
  return {
    s: Math.max(0, Math.min((r -= e.left + a) / (i.width - 2 * a) * 100, 100)),
    v: Math.max(0, Math.min(100 - s, 100))
  };
}

function H$1(t) {
  var r = D$1(t),
      n = r.radius,
      e = t.color.hsv,
      i = r.height - 2 * n;
  return {
    x: n + e.s / 100 * (r.width - 2 * n),
    y: n + (i - e.v / 100 * i)
  };
}

function I$1(t) {
  return [[[0, "#fff"], [100, "hsl(" + t.color.hue + ",100%,50%)"]], [[0, "rgba(0,0,0,0)"], [100, "#000"]]];
}

var P$1 = document.getElementsByTagName("base");

function z$1(t) {
  var r = window.navigator.userAgent,
      n = /^((?!chrome|android).)*safari/i.test(r),
      e = /iPhone|iPod|iPad/i.test(r),
      i = window.location;
  return (n || e) && P$1.length > 0 ? i.protocol + "//" + i.host + i.pathname + i.search + t : t;
}

function C$1(t, r, n, e, i) {
  var a = i - e <= 180 ? 0 : 1;
  return e *= Math.PI / 180, i *= Math.PI / 180, "M " + (t + n * Math.cos(i)) + " " + (r + n * Math.sin(i)) + " A " + n + " " + n + " 0 " + a + " 0 " + (t + n * Math.cos(e)) + " " + (r + n * Math.sin(e));
}

var W = {
  width: 300,
  height: 300,
  handleRadius: 8,
  handleSvg: null,
  handleProps: {
    x: 0,
    y: 0
  },
  color: "#fff",
  borderColor: "#fff",
  borderWidth: 0,
  wheelLightness: !0,
  wheelAngle: 0,
  wheelDirection: "anticlockwise",
  layoutDirection: "vertical",
  sliderSize: null,
  sliderMargin: 12,
  padding: 6
}; // Listen to one or more events on an element

function listen(el, eventList, callback, params) {
  for (var i = 0; i < eventList.length; i++) {
    el.addEventListener(eventList[i], callback, params);
  }
} // Remove an event listener on an element


function unlisten(el, eventList, callback, params) {
  for (var i = 0; i < eventList.length; i++) {
    el.removeEventListener(eventList[i], callback, params);
  }
}

var EventType;

(function (EventType) {
  EventType["MouseDown"] = "mousedown";
  EventType["MouseMove"] = "mousemove";
  EventType["MouseUp"] = "mouseup";
  EventType["TouchStart"] = "touchstart";
  EventType["TouchMove"] = "touchmove";
  EventType["TouchEnd"] = "touchend";
})(EventType || (EventType = {}));

var EventResult;

(function (EventResult) {
  EventResult[EventResult["start"] = 0] = "start";
  EventResult[EventResult["move"] = 1] = "move";
  EventResult[EventResult["end"] = 2] = "end";
})(EventResult || (EventResult = {})); // Base component class for iro UI components
// This extends the Preact component class to allow them to react to mouse/touch input events by themselves


var IroComponentBase =
/*@__PURE__*/
function (Component) {
  function IroComponentBase(props) {
    Component.call(this, props); // Generate unique ID for the component
    // This can be used to generate unique IDs for gradients, etc

    this.uid = (Math.random() + 1).toString(36).substring(5);
  }

  if (Component) IroComponentBase.__proto__ = Component;
  IroComponentBase.prototype = Object.create(Component && Component.prototype);
  IroComponentBase.prototype.constructor = IroComponentBase;

  IroComponentBase.prototype.render = function render(props) {
    var rootProps = {
      onMouseDown: this.handleEvent.bind(this),
      onTouchStart: this.handleEvent.bind(this)
    };
    var rootStyles = {
      overflow: 'visible',
      display: props.layoutDirection === 'vertical' ? 'block' : 'inline-block'
    };
    return h(d, null, props.children(this.uid, rootProps, rootStyles));
  }; // More info on handleEvent:
  // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
  // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell


  IroComponentBase.prototype.handleEvent = function handleEvent(e) {
    e.preventDefault(); // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input

    var point = e.touches ? e.changedTouches[0] : e;
    var x = point.clientX;
    var y = point.clientY; // Get the screen position of the component

    var bounds = this.base.getBoundingClientRect();
    var inputHandler = this.props.onInput;

    switch (e.type) {
      case EventType.MouseDown:
      case EventType.TouchStart:
        listen(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], this, {
          passive: false
        });
        inputHandler(x, y, bounds, EventResult.start);
        break;

      case EventType.MouseMove:
      case EventType.TouchMove:
        inputHandler(x, y, bounds, EventResult.move);
        break;

      case EventType.MouseUp:
      case EventType.TouchEnd:
        inputHandler(x, y, bounds, EventResult.end);
        unlisten(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], this, {
          passive: false
        });
        break;
    }
  };

  return IroComponentBase;
}(m);

function IroHandle(props) {
  var radius = props.r;
  var url = props.url;
  return h("svg", {
    className: "IroHandle",
    x: props.x,
    y: props.y,
    style: {
      overflow: 'visible'
    }
  }, url && h("use", Object.assign({
    xlinkHref: z$1(url)
  }, props.props)), !url && h("circle", {
    r: radius,
    fill: "none",
    "stroke-width": 2,
    stroke: "#000"
  }), !url && h("circle", {
    r: radius - 2,
    fill: "none",
    "stroke-width": 2,
    stroke: "#fff"
  }));
}

IroHandle.defaultProps = {
  x: 0,
  y: 0,
  r: 8,
  url: null,
  props: {
    x: 0,
    y: 0
  }
};
var HUE_STEPS = Array.apply(null, {
  length: 360
}).map(function (_, index) {
  return index;
});

function IroWheel(props) {
  var borderWidth = props.borderWidth;
  var hsv = props.color.hsv;
  var ref = k$1(props);
  var width = ref.width;
  var radius = ref.radius;
  var cx = ref.cx;
  var cy = ref.cy;
  var handlePos = F(props);

  function handleInput(x, y, bounds, type) {
    props.parent.inputActive = true;
    props.color.hsv = j$1(props, x, y, bounds);
    props.onInput(type);
  }

  return h(IroComponentBase, {
    onInput: handleInput
  }, function (uid, rootProps, rootStyles) {
    return h("svg", Object.assign({}, rootProps, {
      className: "IroWheel",
      width: width,
      height: width,
      style: rootStyles
    }), h("defs", null, h("radialGradient", {
      id: uid
    }, h("stop", {
      offset: "0%",
      "stop-color": "#fff"
    }), h("stop", {
      offset: "100%",
      "stop-color": "#fff",
      "stop-opacity": "0"
    }))), h("g", {
      className: "IroWheelHue",
      "stroke-width": radius,
      fill: "none"
    }, HUE_STEPS.map(function (angle) {
      return h("path", {
        key: angle,
        d: C$1(cx, cy, radius / 2, angle, angle + 1.5),
        stroke: "hsl(" + $$1(props, angle) + ", 100%, 50%)"
      });
    })), h("circle", {
      className: "IroWheelSaturation",
      cx: cx,
      cy: cy,
      r: radius,
      fill: "url(" + z$1('#' + uid) + ")"
    }), props.wheelLightness && h("circle", {
      className: "IroWheelLightness",
      cx: cx,
      cy: cy,
      r: radius,
      fill: "#000",
      opacity: 1 - hsv.v / 100
    }), h("circle", {
      className: "IroWheelBorder",
      cx: cx,
      cy: cy,
      r: radius,
      fill: "none",
      stroke: props.borderColor,
      "stroke-width": borderWidth
    }), h(IroHandle, {
      r: props.handleRadius,
      url: props.handleSvg,
      props: props.handleProps,
      x: handlePos.x,
      y: handlePos.y
    }));
  });
}

function IroSlider(props) {
  var ref = S(props);
  var width = ref.width;
  var height = ref.height;
  var radius = ref.radius;
  var handlePos = T$1(props);
  var gradient = R(props);
  var isAlpha = props.sliderType === 'alpha';

  function handleInput(x, y, bounds, type) {
    var value = y$1(props, x, y, bounds);
    props.parent.inputActive = true;
    props.color[props.sliderType] = value;
    props.onInput(type);
  }

  return h(IroComponentBase, {
    onInput: handleInput
  }, function (uid, rootProps, rootStyles) {
    return h("svg", Object.assign({}, rootProps, {
      className: "IroSlider",
      width: width,
      height: height,
      style: Object.assign({}, rootStyles, m$1(props))
    }), h("defs", null, h("linearGradient", Object.assign({
      id: 'g' + uid
    }, A$1(props)), gradient.map(function (ref) {
      var offset = ref[0];
      var color = ref[1];
      return h("stop", {
        offset: offset + "%",
        "stop-color": color
      });
    })), isAlpha && h("pattern", {
      id: 'b' + uid,
      width: "8",
      height: "8",
      patternUnits: "userSpaceOnUse"
    }, h("rect", {
      x: "0",
      y: "0",
      width: "8",
      height: "8",
      fill: "#fff"
    }), h("rect", {
      x: "0",
      y: "0",
      width: "4",
      height: "4",
      fill: "#ccc"
    }), h("rect", {
      x: "4",
      y: "4",
      width: "4",
      height: "4",
      fill: "#ccc"
    })), isAlpha && h("pattern", {
      id: 'f' + uid,
      width: "100%",
      height: "100%"
    }, h("rect", {
      x: "0",
      y: "0",
      width: "100%",
      height: "100%",
      fill: "url(" + z$1('#b' + uid) + ")"
    }), " }", h("rect", {
      x: "0",
      y: "0",
      width: "100%",
      height: "100%",
      fill: "url(" + z$1('#g' + uid) + ")"
    }))), h("rect", {
      className: "IroSliderBg",
      rx: radius,
      ry: radius,
      x: props.borderWidth / 2,
      y: props.borderWidth / 2,
      width: width - props.borderWidth,
      height: height - props.borderWidth,
      "stroke-width": props.borderWidth,
      stroke: props.borderColor,
      fill: "url(" + z$1((isAlpha ? '#f' : '#g') + uid) + ")"
    }), h(IroHandle, {
      r: props.handleRadius,
      url: props.handleSvg,
      props: props.handleProps,
      x: handlePos.x,
      y: handlePos.y
    }));
  });
}

IroSlider.defaultProps = Object.assign({}, w$1); // Turn a component into a widget
// This returns a factory function that can be used to create an instance of the widget component
// The first function param is a DOM element or CSS selector for the element to mount to,
// The second param is for config options which are passed to the component as props
// This factory function can also delay mounting the element into the DOM until the page is ready

function createWidget(WidgetComponent) {
  var widgetFactory = function (parent, props) {
    var widget; // will become an instance of the widget component class

    var widgetRoot = document.createElement('div'); // Render widget into a temp DOM node

    I(h(WidgetComponent, Object.assign({}, {
      ref: function (ref) {
        return widget = ref;
      }
    }, props)), widgetRoot);

    function mountWidget() {
      var container = parent instanceof Element ? parent : document.querySelector(parent);
      container.appendChild(widget.base);
      widget.onMount(container);
    } // Mount it into the DOM when the page document is ready


    if (document.readyState !== 'loading') {
      mountWidget();
    } else {
      document.addEventListener('DOMContentLoaded', mountWidget);
    }

    return widget;
  }; // Allow the widget factory to inherit component prototype + static class methods
  // This makes it easier for plugin authors to extend the base widget component


  widgetFactory.prototype = WidgetComponent.prototype;
  Object.assign(widgetFactory, WidgetComponent); // Add reference to base component too

  widgetFactory.__component = WidgetComponent;
  return widgetFactory;
}

var IroColorPicker =
/*@__PURE__*/
function (Component) {
  function IroColorPicker(props) {
    Component.call(this, props);
    this.inputActive = false;
    this.events = {};
    this.deferredEvents = {};
    this.colorUpdateActive = false;
    this.emitHook('init:before');
    this.id = props.id;
    this.defaultColor = props.color; // Whenever the color changes, update the color wheel

    this.color = new p(props.color, this.onColorChange.bind(this));
    this.deferredEmit('color:init', this.color); // Pass all the props into the component's state,
    // Except we want to add the color object and make sure that refs aren't passed down to children

    this.state = Object.assign({}, props, {
      ref: undefined,
      color: this.color,
      layout: props.layout !== null ? props.layout : [// default layout is just a wheel and a slider
      {
        component: IroWheel,
        options: {}
      }, {
        component: IroSlider,
        options: {}
      }]
    });
    this.emitHook('init:state');
    this.emitHook('init:after');
  }

  if (Component) IroColorPicker.__proto__ = Component;
  IroColorPicker.prototype = Object.create(Component && Component.prototype);
  IroColorPicker.prototype.constructor = IroColorPicker; // Public ColorPicker events API

  /**
   * @desc Set a callback function for an event
   * @param eventList event(s) to listen to
   * @param callback - Function called when the event is fired
   */

  IroColorPicker.prototype.on = function on(eventList, callback) {
    var this$1 = this;
    var events = this.events; // eventList can be an eventType string or an array of eventType strings

    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
      // Emit plugin hook
      this$1.emitHook('event:on', eventType, callback); // Add event callback

      (events[eventType] || (events[eventType] = [])).push(callback); // Call deferred events
      // These are events that can be stored until a listener for them is added

      if (this$1.deferredEvents[eventType]) {
        // Deffered events store an array of arguments from when the event was called
        this$1.deferredEvents[eventType].forEach(function (args) {
          callback.apply(null, args);
        }); // Clear deferred events

        this$1.deferredEvents[eventType] = [];
      }
    });
  };
  /**
   * @desc Remove a callback function for an event added with on()
   * @param eventList - event(s) to listen to
   * @param callback - original callback function to remove
   */


  IroColorPicker.prototype.off = function off(eventList, callback) {
    var this$1 = this;
    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
      var callbackList = this$1.events[eventType];
      this$1.emitHook('event:off', eventType, callback);

      if (callbackList) {
        callbackList.splice(callbackList.indexOf(callback), 1);
      }
    });
  };
  /**
   * @desc Emit an event
   * @param eventType event to emit
   */


  IroColorPicker.prototype.emit = function emit(eventType) {
    var ref;
    var args = [],
        len = arguments.length - 1;

    while (len-- > 0) args[len] = arguments[len + 1]; // Events are plugin hooks too


    (ref = this).emitHook.apply(ref, [eventType].concat(args));
    var callbackList = this.events[eventType] || [];

    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i].apply(this, args);
    }
  };
  /**
   * @desc Emit an event now, or save it for when the relevent event listener is added
   * @param eventType - The name of the event to emit
   */


  IroColorPicker.prototype.deferredEmit = function deferredEmit(eventType) {
    var ref;
    var args = [],
        len = arguments.length - 1;

    while (len-- > 0) args[len] = arguments[len + 1];

    var deferredEvents = this.deferredEvents;
    (ref = this).emit.apply(ref, [eventType].concat(args));
    (deferredEvents[eventType] || (deferredEvents[eventType] = [])).push(args);
  }; // Public utility methods


  IroColorPicker.prototype.updateOptions = function updateOptions(newOptions) {
    this.setState(Object.assign({}, this.state, newOptions));
  };
  /**
   * @desc Resize the color picker
   * @param width - new width
   */


  IroColorPicker.prototype.resize = function resize(width) {
    this.updateOptions({
      width: width
    });
  };
  /**
   * @desc Reset the color picker to the initial color provided in the color picker options
   */


  IroColorPicker.prototype.reset = function reset() {
    this.color.set(this.defaultColor);
  }; // Plugin hooks API

  /**
   * @desc Set a callback function for a hook
   * @param hookType - The name of the hook to listen to
   * @param callback
   */


  IroColorPicker.addHook = function addHook(hookType, callback) {
    var pluginHooks = IroColorPicker.pluginHooks;
    (pluginHooks[hookType] || (pluginHooks[hookType] = [])).push(callback);
  };
  /**
   * @desc Emit a callback hook
   * @param hookType - The type of hook event to emit
   */


  IroColorPicker.prototype.emitHook = function emitHook(hookType) {
    var args = [],
        len = arguments.length - 1;

    while (len-- > 0) args[len] = arguments[len + 1];

    var callbackList = IroColorPicker.pluginHooks[hookType] || [];

    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i].apply(this, args);
    }
  };
  /**
   * @desc Called by the createWidget wrapper when the element is mounted into the page
   * @param container - the container element for this ColorPicker instance
   */


  IroColorPicker.prototype.onMount = function onMount(container) {
    this.el = container;
    this.deferredEmit('mount', this);
  }; // Internal methods

  /**
   * @desc React to a color update
   * @param color - current color
   * @param changes - shows which h,s,v,a color channels changed
   */


  IroColorPicker.prototype.onColorChange = function onColorChange(color, changes) {
    this.emitHook('color:beforeUpdate', color, changes);
    this.setState({
      color: color
    });
    this.emitHook('color:afterUpdate', color, changes); // Prevent infinite loops if the color is set inside a color:change or input:change callback

    if (!this.colorUpdateActive) {
      // While _colorUpdateActive == true, branch cannot be entered
      this.colorUpdateActive = true; // If the color change originates from user input, fire input:change

      if (this.inputActive) {
        this.inputActive = false;
        this.emit('input:change', color, changes);
      } // Always fire color:change event


      this.emit('color:change', color, changes);
      this.colorUpdateActive = false;
    }
  };
  /**
   * @desc Handle input from a UI control element
   * @param type - event type
   */


  IroColorPicker.prototype.handleInput = function handleInput(type) {
    if (type === EventResult.start) {
      this.emit('input:start', this.color);
    }

    if (type === EventResult.move) {
      this.emit('input:move', this.color);
    }

    if (type === EventResult.end) {
      this.emit('input:end', this.color);
    }
  };

  IroColorPicker.prototype.render = function render(props, state) {
    var this$1 = this;
    var obj;
    return h("div", {
      class: "IroColorPicker",
      id: state.id,
      style: (obj = {
        display: state.display
      }, obj[props.layoutDirection === 'vertical' ? 'width' : 'height'] = state.width, obj)
    }, state.layout.map(function (ref) {
      var UiComponent = ref.component;
      var options = ref.options;
      return h(UiComponent, Object.assign({}, state, options, {
        onInput: this$1.handleInput.bind(this$1),
        parent: this$1
      }));
    }));
  };

  return IroColorPicker;
}(m);

IroColorPicker.pluginHooks = {};
IroColorPicker.defaultProps = Object.assign({}, W, {
  display: 'block',
  id: null,
  layout: null
});
var IroColorPickerWidget = createWidget(IroColorPicker);

function IroBox(props) {
  var ref = D$1(props);
  var width = ref.width;
  var height = ref.height;
  var radius = ref.radius;
  var gradients = I$1(props);
  var handlePos = H$1(props);

  function handleInput(x, y, bounds, type) {
    props.parent.inputActive = true;
    props.color.hsv = O(props, x, y, bounds);
    props.onInput(type);
  }

  return h(IroComponentBase, {
    onInput: handleInput
  }, function (uid, rootProps, rootStyles) {
    return h("svg", Object.assign({}, rootProps, {
      className: "IroBox",
      width: width,
      height: height,
      style: Object.assign({}, rootStyles, E(props))
    }), h("defs", null, h("linearGradient", {
      id: 's' + uid,
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%"
    }, gradients[0].map(function (ref) {
      var offset = ref[0];
      var color = ref[1];
      return h("stop", {
        offset: offset + "%",
        "stop-color": color
      });
    })), h("linearGradient", {
      id: 'l' + uid,
      x1: "0%",
      y1: "0%",
      x2: "0%",
      y2: "100%"
    }, gradients[1].map(function (ref) {
      var offset = ref[0];
      var color = ref[1];
      return h("stop", {
        offset: offset + "%",
        "stop-color": color
      });
    })), h("pattern", {
      id: 'f' + uid,
      width: "100%",
      height: "100%"
    }, h("rect", {
      x: "0",
      y: "0",
      width: "100%",
      height: "100%",
      fill: "url(" + z$1('#s' + uid) + ")"
    }), " }", h("rect", {
      x: "0",
      y: "0",
      width: "100%",
      height: "100%",
      fill: "url(" + z$1('#l' + uid) + ")"
    }))), h("rect", {
      rx: radius,
      ry: radius,
      x: props.borderWidth / 2,
      y: props.borderWidth / 2,
      width: width - props.borderWidth,
      height: height - props.borderWidth,
      "stroke-width": props.borderWidth,
      stroke: props.borderColor,
      fill: "url(" + z$1('#f' + uid) + ")"
    }), h(IroHandle, {
      r: props.handleRadius,
      url: props.handleSvg,
      props: props.handleProps,
      x: handlePos.x,
      y: handlePos.y
    }));
  });
} // iro.js plugins API
// This provides the iro.use method, which can be used to register plugins which extend the iro.js core


function usePlugins(core) {
  var installedPlugins = []; // Register iro.js plugin

  core.use = function (plugin, pluginOptions) {
    if (pluginOptions === void 0) pluginOptions = {}; // Check that the plugin hasn't already been registered

    if (!(installedPlugins.indexOf(plugin) > -1)) {
      // Init plugin
      // TODO: consider collection of plugin utils, which are passed as a thrid param
      plugin(core, pluginOptions); // Register plugin

      installedPlugins.push(plugin);
    }
  };

  core.installedPlugins = installedPlugins;
  return core;
}

var index = usePlugins({
  Color: p,
  ColorPicker: IroColorPickerWidget,
  ui: {
    h: h,
    ComponentBase: IroComponentBase,
    Handle: IroHandle,
    Slider: IroSlider,
    Wheel: IroWheel,
    Box: IroBox
  },
  version: "5.0.0"
});
var _default = index;
exports.default = _default;
},{}],"js/controls.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = exports.ColorPicker = exports.SeasonButton = void 0;

var _iro = _interopRequireDefault(require("@jaames/iro"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const removeColorPicker = () => {
  const colorPicker = document.getElementsByClassName("IroColorPicker")[0];
  if (colorPicker) colorPicker.remove();
};

class SeasonButton {
  constructor(id, store, sliders, seasons) {
    this.element = document.getElementById(`season-${id}`); // Initialize

    this.element.style = `background: ${store.seasons[`season${id}`].color}`;

    this.element.onclick = () => {
      let slider, season;
      store.updateActiveSeason(id);
      removeColorPicker();

      for (let key in seasons) {
        season = seasons[key].element;

        if (key.match(id)) {
          season.classList.add("active");
        } else {
          season.classList.remove("active");
        }
      }

      for (let key in sliders) {
        slider = sliders[key];
        slider.setValue(store.seasons[`season${id}`][slider.name]);
      }
    };
  }

}

exports.SeasonButton = SeasonButton;

class ColorPicker {
  constructor(id, store, seasons) {
    this.element = document.getElementById(id);

    this.element.onclick = () => {
      removeColorPicker();
      const colorPicker = new _iro.default.ColorPicker(`#${id}`, {
        width: 150,
        padding: 2,
        color: store.seasons[`season${store.activeSeason}`].color,
        layout: [{
          component: _iro.default.ui.Wheel
        }]
      });
      colorPicker.base.style = "position: relative; width: 100px; transform: translate(-50%, -50%); top: -85px; left: -5px; padding: 10px;";

      if (seasons) {
        colorPicker.on("input:change", (color, changes) => {
          const target = seasons[`season${store.activeSeason}`].element;
          store.updateColor(color.rgbString, color.rgb);
          target.style = `background: ${color.rgbString};`;
        });
      } else {
        colorPicker.on("input:change", (color, changes) => {
          store.updateBackground(color.rgbString, color.rgb);
          document.body.style = `background: ${color.rgbString};`;
        });
      }

      colorPicker.on("input:end", (color, changes) => {
        colorPicker.base.remove();
      });
    };
  }

}

exports.ColorPicker = ColorPicker;

class Slider {
  constructor(id, store) {
    _defineProperty(this, "setValue", value => {
      this.element.value = value;
    });

    _defineProperty(this, "updateValue", evt => {
      // conso
      this.store.updateSlider(this.name, evt.target.value);
    });

    this.element = document.getElementById(`slider-${id}`);
    this.store = store;
    this.name = this.element.name;
    this.element.value = store.seasons[`season${store.activeSeason}`][this.name]; // eventlistener

    this.element.onmousedown = removeColorPicker;
    this.element.ontouchstart = removeColorPicker;
    this.element.oninput = this.updateValue;
  }

}

exports.Slider = Slider;
},{"@jaames/iro":"node_modules/@jaames/iro/dist/iro.es.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _store = _interopRequireDefault(require("./js/store"));

var _gl = _interopRequireDefault(require("./js/gl"));

var _lines = _interopRequireDefault(require("./images/lines.png"));

var _letters = _interopRequireDefault(require("./images/letters.png"));

var _controls = require("./js/controls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("load", async () => {
  const lettersImage = await loadImage(_letters.default);
  const linesImage = await loadImage(_lines.default);
  const canvas = document.getElementById("canvas");
  const footer = document.getElementById("footer");
  const dlBtn = document.getElementById("download");
  const seasons = {};
  const sliders = {};
  const globalStore = new _store.default();
  const gl = new _gl.default(canvas, globalStore, lettersImage, linesImage);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - footer.offsetHeight; // Initialize in DOM element to Javascript

  const resizeView = () => {
    canvas.style.transform = `matrix(${window.innerWidth / canvas.width}, 0, 0, ${(window.innerHeight - footer.offsetHeight) / canvas.height}, ${(window.innerWidth - canvas.width) / 2}, ${(window.innerHeight - footer.offsetHeight - canvas.height) / 2})`;
  };

  window.addEventListener("resize", resizeView, false);
  window.addEventListener("orientationchange", resizeView, false);
  resizeView();
  dlBtn.addEventListener("click", evt => {
    const image = canvas.toDataURL("image/png");
    dlBtn.href = image;
  });

  for (let i = 1; i < 4; i++) {
    sliders[`slider${i}`] = new _controls.Slider(i, globalStore);
  }

  for (let i = 1; i < 5; i++) {
    seasons[`season${i}`] = new _controls.SeasonButton(i, globalStore, sliders, seasons);
  }

  new _controls.ColorPicker("season-color", globalStore, seasons);
  new _controls.ColorPicker("screen-color", globalStore);
  gl.initialize();
});

const loadImage = url => {
  return new Promise(function (resolve) {
    var image = new Image();
    image.src = url;

    image.onload = function () {
      resolve(image);
    };
  });
};
},{"./js/store":"js/store.js","./js/gl":"js/gl.js","./images/lines.png":"images/lines.png","./images/letters.png":"images/letters.png","./js/controls":"js/controls.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54011" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/TDC_Web.e31bb0bc.js.map