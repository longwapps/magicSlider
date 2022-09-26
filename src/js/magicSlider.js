(function (){
    "use strict";
    let MS = function (selector, options, mouseUp, resizeInit){
        let slider = ({
            defaults : {
                min: 0,
                max: 10,
                values: null,
                interval: 1,
                labelInterval: 1,
                onlyEndLabels: false,
                pointerValues: true,
                pointerImage: null,
                rangeColor: '#3498db',
                startPoints: [0,10]
            },
            onChangeCallback: null,
            supportTouch: 'ontouchstart' in window || navigator.msMaxTouchPoints,
            lkey: 0,
            rkey: 0,
            getMin: function(){
                return this.lkey;
            },
            getMax: function(){
                return this.rkey;
            },
            getRange: function(){
                return this.lkey + ',' + this.rkey;
            },
            destroy: function (){
                let elem = document.getElementById(selector);
                elem.innerHTML = '';
            },
            init: function(){
                for (var key in options) {
                    if (options.hasOwnProperty(key))
                        this.defaults[key] = options[key];
                }
                if(this.defaults.values != null){
                    if(!Array.isArray(this.defaults.values)){
                        alert('Parameter "values" should be an array');
                        return false;
                    }else if(this.defaults.values.length < 2){
                        alert('Parameter "values" should be an array with minimum length 2');
                        return false;
                    }
                    this.defaults.values = this.defaults.values.sort();
                    this.defaults.min = this.defaults.values[0];
                    this.defaults.max = this.defaults.values[this.defaults.values.length - 1];
                }
                if(!Array.isArray(this.defaults.startPoints)){
                    alert('Parameter "startPoints" should be an array');
                    return false;
                }else if(this.defaults.startPoints.length != 2){
                    alert('Parameter "startPoints" must be an array with length 2');
                    return false;
                }
                this.lkey = this.defaults.startPoints[0];
                this.rkey = this.defaults.startPoints[1];
                if(this.lkey < this.defaults.min || this.rkey > this.defaults.max){
                    alert('Out of range starting points');
                    return false;
                }
                this.createSlider();
                return this;
            },
            getClosest: function(goal, counts){
                var closest = counts.reduce(function(prev, curr) {
                    return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
                });
                var iof = counts.indexOf(closest);
                return [iof, closest];
            },
            onReSize: function(){
                if(document.getElementById(selector).offsetParent !== null){
                    this.createSlider();
                    return this;
                }
            },
            onChange: function (callback){
                this.onChangeCallback = callback;
                return this;
            },
            triggerChange: function (){
                if(typeof this.onChangeCallback === 'function')
                    return this.onChangeCallback({min: this.lkey, max: this.rkey});
            },
            setValues: function (min, max){
                this.lkey = min;
                this.rkey = max;
                this.createSlider();
                return this;
            },
            createSlider: function(){
                let steps = parseFloat(this.defaults.max - this.defaults.min)/this.defaults.interval;
                let lblSteps, lblStepWidth;
                if(!Number.isInteger(steps)){
                    alert('Parameter "interval" should be a perfect divider of the range');
                    return false;
                }
                if(this.defaults.interval != this.defaults.labelInterval) {
                    lblSteps = parseInt(this.defaults.max - this.defaults.min)/this.defaults.labelInterval;
                    if(!Number.isInteger(lblSteps)){
                        alert('Parameter "labelInterval" should be a perfect divider of the range');
                        return false;
                    }
                }
                let _this = this;
                let lc,lcm,lcp,rc,rcm,rcp;
                let elem = document.getElementById(selector);
                elem.innerHTML = '';
                elem.style.position = 'relative';
                elem.style.height = '90px';
                elem.style.marginTop = '0';
                if(this.defaults.pointerValues)
                    elem.style.marginTop = '20px';
                elem.style.marginBottom = '20px';
                elem.style.marginRight = '15px';
                elem.style.marginLeft = '15px';
                elem.style.padding = '40px 0';
                let lineContainer = document.createElement('div');
                lineContainer.className = 'magicSlider-range-container';
                elem.appendChild(lineContainer);
                let line = document.createElement("hr");
                line.style.display = 'block';
                line.style.height = '10px';
                line.style.border = 'none';
                line.style.margin = '0';
                line.style.backgroundColor = '#aaa';
                line.style.borderRadius = '10px';
                line.style.touchAction = 'none';
                lineContainer.appendChild(line);
                line.addEventListener('click', function (e){
                    if(!freezeMovement){
                        let position = e.clientX - line.getBoundingClientRect().left;
                        if(position < lc.offsetLeft){
                            var lcl = _this.getClosest(position, arr);
                            _this.lkey = valArr[lcl[0]];
                            ldown = lcl[1]-13;
                            lc.style.left = ldown + 'px';
                            lcp.style.left = (ldown-5) + 'px';
                            lcp.innerHTML = _this.getMin();
                            rmin = ldown;
                            range.style.left = (ldown+13)+'px';
                            range.style.width = (rdown-ldown)+'px';
                            lc.style.zIndex = 4;
                            rc.style.zIndex = 2;
                        }else if(position > rc.offsetLeft){
                            var rcl = _this.getClosest(position, arr);
                            _this.rkey = valArr[rcl[0]];
                            rdown = rcl[1]-13;
                            rc.style.left = rdown + 'px';
                            rcp.style.left = (rdown-5) + 'px';
                            rcp.innerHTML = _this.getMax();
                            lmax = rdown;
                            range.style.width = (rdown-ldown)+'px';
                            lc.style.zIndex = 2;
                            rc.style.zIndex = 4;
                        }
                        _this.triggerChange();
                        return _this;
                    }
                });

                let min = 0;
                let max = line.offsetWidth;
                let stepWidth = max/steps;
                const length = Math.round((max - min) / stepWidth) + 1;
                const arr = Array.from({ length }, (_, i) => min + i * stepWidth);
                const valArr = Array.from({ length }, (_, i) => this.defaults.min + i * this.defaults.interval);
                var lblArr = valArr;
                if(this.defaults.interval != this.defaults.labelInterval) {
                    lblStepWidth = max/lblSteps;
                    const lblLength = Math.round((max - min) / lblStepWidth) + 1;
                    lblArr = Array.from({ length : lblLength }, (_, i) => this.defaults.min + i * this.defaults.labelInterval);
                }
                let range = document.createElement("span");
                range.style.height = '10px';
                range.style.background = this.defaults.rangeColor;
                range.style.top = '40px';
                range.style.display = 'block';
                range.style.position = 'absolute';
                range.style.borderRadius = '10px';
                range.style.zIndex = '1';
                range.style.touchAction = 'none';
                let width = 0;
                let mousePosition;
                let loffset = 0,roffset = 0;
                let ldown = 0, rdown = 0;
                let lisDown = false,risDown = false, freezeMovement = false;
                let lmax=max-13,lmin=-13,rmax=max-13,rmin=-13;
                for(var i in arr){
                    if((this.defaults.onlyEndLabels && (i == 0 || i == arr.length - 1)) || !this.defaults.onlyEndLabels) {
                        if(((this.defaults.interval != this.defaults.labelInterval) && lblArr.indexOf(valArr[i]) != -1) || (this.defaults.interval == this.defaults.labelInterval)) {
                            var stEl = document.createElement("span");
                            stEl.className = selector+'-magicSlider-val-label';
                            stEl.style.top = '60px';
                            stEl.style.textAlign = 'center';
                            stEl.style.height = '26px';
                            stEl.style.fontSize = '15px';
                            stEl.style.lineHeight = '18px';
                            stEl.style.padding = '4px';
                            stEl.style.position = 'absolute';
                            stEl.style.boxSizing = 'border-box';
                            stEl.style.touchAction = 'none';
                            var textNode = document.createTextNode(valArr[i]);
                            stEl.appendChild(textNode);
                            stEl.style.left = arr[i] + 'px';
                            elem.appendChild(stEl);
                        }
                    }
                    if(valArr[i] == this.lkey){
                        range.style.left = arr[i]+'px';
                        width = arr[i];
                        lc = document.createElement("span");
                        lc.className = 'magicSlider-cursor';
                        lc.style.width = '26px';
                        lc.style.height = '26px';
                        lc.style.borderRadius = '26px';
                        lc.style.position = 'absolute';
                        lc.style.zIndex = 4;
                        lc.style.top = '32px';
                        lc.style.cursor = 'pointer';
                        if(this.defaults.pointerImage == null) {
                            lc.style.boxShadow = '#00f 0px 0px 5px';
                            lc.style.background = '#00f';
                        }else{
                            lc.style.backgroundImage = 'url("'+this.defaults.pointerImage+'")';
                            lc.style.backgroundSize = 'contain';
                            lc.style.backgroundRepeat = 'no-repeat';
                            lc.style.backgroundPosition = 'center';
                        }
                        lc.style.touchAction = 'none';
                        ldown = arr[i]-13;
                        rmin = ldown;
                        lc.style.left = ldown+'px';
                        lcm = document.createElement("span");
                        lcm.className = 'magicSlider-cursor-mover';
                        lcm.style.width = '46px';
                        lcm.style.height = '46px';
                        lcm.style.borderRadius = '46px';
                        lcm.style.position = 'absolute';
                        lcm.style.backgroundColor = 'transparent';
                        lcm.style.border = '1px solid transparent';
                        lcm.style.zIndex = 3;
                        lcm.style.top = '-10px';
                        lcm.style.cursor = 'pointer';
                        lcm.style.left = '-10px';
                        if(this.defaults.pointerValues){
                            lcp = document.createElement("span");
                            var lcpText = document.createTextNode(this.lkey);
                            lcp.appendChild(lcpText);
                            lcp.className = 'magicSlider-pointer-val';
                            lcp.style.textAlign = 'center';
                            lcp.style.width = '36px';
                            lcp.style.height = '18px';
                            lcp.style.borderRadius = '5px';
                            lcp.style.lineHeight = '12px';
                            lcp.style.boxShadow = '2px 2px 2px #ccc';
                            lcp.style.padding = '2px';
                            lcp.style.fontSize = '12px';
                            lcp.style.top = '0px';
                            lcp.style.border = '1px solid #ccc';
                            lcp.style.position = 'absolute';
                            lcp.style.touchAction = 'none';
                            lcp.style.boxSizing = 'border-box';
                            lcp.style.left = (ldown-5)+'px';
                            elem.appendChild(lcp);
                        }
                        lc.appendChild(lcm);
                        elem.appendChild(lc);
                    }
                    if(valArr[i] == this.rkey){
                        width = arr[i] - width;
                        rc = document.createElement("span");
                        rc.className = 'magicSlider-cursor';
                        rc.style.width = '26px';
                        rc.style.height = '26px';
                        rc.style.borderRadius = '26px';
                        rc.style.position = 'absolute';
                        rc.style.zIndex = 2;
                        rc.style.top = '32px';
                        rc.style.cursor = 'pointer';
                        if(this.defaults.pointerImage == null) {
                            rc.style.boxShadow = '#00f 0px 0px 5px';
                            rc.style.background = '#00f';
                        }else{
                            rc.style.backgroundImage = 'url("'+this.defaults.pointerImage+'")';
                            rc.style.backgroundSize = 'contain';
                            rc.style.backgroundRepeat = 'no-repeat';
                            rc.style.backgroundPosition = 'center';
                        }
                        rc.style.touchAction = 'none';
                        rdown = arr[i]-13;
                        lmax = rdown;
                        rc.style.left = rdown+'px';
                        rcm = document.createElement("span");
                        rcm.className = 'magicSlider-cursor-mover';
                        rcm.style.width = '46px';
                        rcm.style.height = '46px';
                        rcm.style.borderRadius = '46px';
                        rcm.style.position = 'absolute';
                        rcm.style.backgroundColor = 'transparent';
                        rcm.style.border = '1px solid transparent';
                        rcm.style.zIndex = 3;
                        rcm.style.top = '-10px';
                        rcm.style.cursor = 'pointer';
                        rcm.style.left = '-10px';
                        if(this.defaults.pointerValues){
                            rcp = document.createElement("span");
                            var rcpText = document.createTextNode(this.rkey);
                            rcp.appendChild(rcpText);
                            rcp.className = 'magicSlider-pointer-val';
                            rcp.style.textAlign = 'center';
                            rcp.style.width = '36px';
                            rcp.style.height = '18px';
                            rcp.style.borderRadius = '5px';
                            rcp.style.lineHeight = '12px';
                            rcp.style.boxShadow = '2px 2px 2px #ccc';
                            rcp.style.padding = '2px';
                            rcp.style.fontSize = '12px';
                            rcp.style.top = '0px';
                            rcp.style.border = '1px solid #ccc';
                            rcp.style.position = 'absolute';
                            rcp.style.touchAction = 'none';
                            rcp.style.boxSizing = 'border-box';
                            rcp.style.left = (rdown-5)+'px';
                            elem.appendChild(rcp);
                        }
                        rc.appendChild(rcm);
                        elem.appendChild(rc);
                    }
                }
                let maxLabel = 0;
                let valueLabels = document.getElementsByClassName(selector+'-magicSlider-val-label');
                for (var i = 0; i < valueLabels.length; i++) {
                    var thisLen = parseFloat(valueLabels.item(i).getBoundingClientRect().width);
                    if(thisLen > maxLabel)
                        maxLabel = thisLen;
                }
                for (var i = 0; i < valueLabels.length; i++) {
                    valueLabels.item(i).style.width = maxLabel + 'px';
                    valueLabels.item(i).style.left = (parseFloat(valueLabels.item(i).style.left) - maxLabel/2) + 'px';
                    if(i != 0 && i != valueLabels.length - 1 && maxLabel > lblStepWidth){
                        valueLabels.item(i).style.display = 'none';
                    }
                }
                range.style.width = width+'px';
                elem.appendChild(range);
                range.addEventListener('click', function (e){
                    if(!freezeMovement){
                        let position = e.clientX - line.getBoundingClientRect().left;
                        if((position - lc.offsetLeft) <= (rc.offsetLeft - position)){
                            var lcl = _this.getClosest(position, arr);
                            _this.lkey = valArr[lcl[0]];
                            ldown = lcl[1]-13;
                            lc.style.left = ldown + 'px';
                            lcp.style.left = (ldown-5) + 'px';
                            lcp.innerHTML = _this.getMin();
                            rmin = ldown;
                            range.style.left = (ldown+13)+'px';
                            range.style.width = (rdown-ldown)+'px';
                            lc.style.zIndex = 4;
                            rc.style.zIndex = 2;
                        }else{
                            var rcl = _this.getClosest(position, arr);
                            _this.rkey = valArr[rcl[0]];
                            rdown = rcl[1]-13;
                            rc.style.left = rdown + 'px';
                            rcp.style.left = (rdown-5) + 'px';
                            rcp.innerHTML = _this.getMax();
                            lmax = rdown;
                            range.style.width = (rdown-ldown)+'px';
                            lc.style.zIndex = 2;
                            rc.style.zIndex = 4;
                        }
                        _this.triggerChange();
                        return _this;
                    }
                });

                document.addEventListener('pointerup', function() {
                    freezeMovement = false;
                    if (lisDown) {
                        lisDown = false;
                        lc.style.left = ldown + 'px';
                        lcp.style.left = (ldown-5) + 'px';
                        lcp.innerHTML = _this.getMin();
                        rmin = ldown;
                        range.style.left = (ldown+13) + 'px';
                        range.style.width = (rdown - ldown) + 'px';
                        _this.triggerChange();
                        if(mouseUp instanceof Function)
                            mouseUp(true);
                    }else if (risDown) {
                        risDown = false;
                        rc.style.left = rdown + 'px';
                        rcp.style.left = (rdown-5) + 'px';
                        rcp.innerHTML = _this.getMax();
                        lmax = rdown;
                        range.style.width = (rdown - ldown) + 'px';
                        _this.triggerChange();
                        if(mouseUp instanceof Function)
                            mouseUp(true);
                    }
                });

                document.addEventListener('pointermove', function(e) {
                    freezeMovement = true;
                    e.preventDefault();
                    mousePosition = e.clientX;
                    if (lisDown) {
                        var lleft = mousePosition + loffset;
                        if(lleft > lmax)
                            lleft = lmax;
                        else if(lleft < lmin)
                            lleft = lmin;
                        var lcl = _this.getClosest(lleft+13, arr);
                        _this.lkey = valArr[lcl[0]];
                        ldown = lcl[1]-13;
                        lc.style.left = lleft + 'px';
                        lcp.style.left = (lleft-5) + 'px';
                        lcp.innerHTML = _this.getMin();
                        range.style.left = (lleft+13)+'px';
                        range.style.width = (rdown-lleft)+'px';
                        rmin = lleft;
                        lc.style.zIndex = 4;
                        rc.style.zIndex = 2;
                        return _this;
                    }else if (risDown) {
                        var rleft = mousePosition + roffset;
                        if(rleft > rmax)
                            rleft = rmax;
                        else if(rleft < rmin)
                            rleft = rmin;
                        var rcl = _this.getClosest(rleft+13, arr);
                        _this.rkey = valArr[rcl[0]];
                        rdown = rcl[1]-13;
                        rc.style.left = rleft + 'px';
                        rcp.style.left = (rleft-5) + 'px';
                        rcp.innerHTML = _this.getMax();
                        range.style.width = (rleft-ldown)+'px';
                        lmax = rleft;
                        lc.style.zIndex = 2;
                        rc.style.zIndex = 4;
                        return _this;
                    }
                });

                lc.addEventListener('pointerdown', function(e) {
                    lisDown = true;
                    risDown = false;
                    loffset = lc.offsetLeft - e.clientX;
                });

                rc.addEventListener('pointerdown', function(e) {
                    risDown = true;
                    lisDown = false;
                    roffset = rc.offsetLeft - e.clientX;
                });
                return this;
            }
        }).init();
        window.addEventListener('resize', (e) => {
            if(typeof resizeInit !== 'undefined')
                resizeInit(true);
            slider.onReSize();
        });
        return slider;
    };

    window.magicSlider = MS;
})();