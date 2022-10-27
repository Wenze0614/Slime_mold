// export function gaussBlur_4 (scl, tcl, w, h, r) {
//     var bxs = boxesForGauss(r, 3);
//     boxBlur_4 (scl, tcl, w, h, (bxs[0]-1)/2);
//     boxBlur_4 (tcl, scl, w, h, (bxs[1]-1)/2);
//     boxBlur_4 (scl, tcl, w, h, (bxs[2]-1)/2);
// }
// function boxBlur_4 (scl, tcl, w, h, r) {
//     for(var i=0; i<scl.length; i++) tcl[i] = scl[i];
//     boxBlurH_4(tcl, scl, w, h, r);
//     boxBlurT_4(scl, tcl, w, h, r);
// }
// function boxBlurH_4 (scl, tcl, w, h, r) {
//     var iarr = 1 / (r+r+1);
//     for(var i=0; i<h; i++) {
//         var ti = i*w, li = ti, ri = ti+r;
//         var fv = scl[ti], lv = scl[ti+w-1], val = (r+1)*fv;
//         for(var j=0; j<r; j++) {
//             val += scl[ti+j];
//         };
//         for(var j=0  ; j<=r ; j++) { val += scl[ri++] - fv       ;   tcl[ti++] = Math.round(val*iarr); }
//         for(var j=r+1; j<w-r; j++) { val += scl[ri++] - scl[li++];   tcl[ti++] = Math.round(val*iarr); }
//         for(var j=w-r; j<w  ; j++) { val += lv        - scl[li++];   tcl[ti++] = Math.round(val*iarr); }
//     }
// }
// function boxBlurT_4 (scl, tcl, w, h, r) {
//     var iarr = 1 / (r+r+1);
//     for(var i=0; i<w; i++) {
//         var ti = i, li = ti, ri = ti+r*w;
//         var fv = scl[ti], lv = scl[ti+w*(h-1)], val = (r+1)*fv;
//         for(var j=0; j<r; j++) val += scl[ti+j*w];
//         for(var j=0  ; j<=r ; j++) { val += scl[ri] - fv     ;  tcl[ti] = Math.round(val*iarr);  ri+=w; ti+=w; }
//         for(var j=r+1; j<h-r; j++) { val += scl[ri] - scl[li];  tcl[ti] = Math.round(val*iarr);  li+=w; ri+=w; ti+=w; }
//         for(var j=h-r; j<h  ; j++) { val += lv      - scl[li];  tcl[ti] = Math.round(val*iarr);  li+=w; ti+=w; }
//     }
// }

// function boxesForGauss(sigma, n)  // standard deviation, number of boxes
// {
//     var wIdeal = Math.sqrt((12*sigma*sigma/n)+1);  // Ideal averaging filter width 
//     var wl = Math.floor(wIdeal);  if(wl%2===0) wl--;
//     var wu = wl+2;
				
//     var mIdeal = (12*sigma*sigma - n*wl*wl - 4*n*wl - 3*n)/(-4*wl - 4);
//     var m = Math.round(mIdeal);
//     // var sigmaActual = Math.sqrt( (m*wl*wl + (n-m)*wu*wu - n)/12 );
				
//     var sizes = [];  for(var i=0; i<n; i++) sizes.push(i<m?wl:wu);
//     return sizes;
// }




















export function blur(values, r) {
    if (!((r = +r) >= 0)) throw new RangeError("invalid r");
    let length = values.length;
    if (!((length = Math.floor(length)) >= 0)) throw new RangeError("invalid length");
    if (!length || !r) return values;
    const blur = blurf(r);
    const temp = values.slice();
    blur(values, temp, 0, length, 1);
    blur(temp, values, 0, length, 1);
    blur(values, temp, 0, length, 1);
    return values;
  }
  
  export const blur2 = Blur2(blurf);
  
  export const blurImage = Blur2(blurfImage);
  
  function Blur2(blur) {
    return function(data, rx, ry = rx,width, height) {
      if (!((rx = +rx) >= 0)) throw new RangeError("invalid rx");
      if (!((ry = +ry) >= 0)) throw new RangeError("invalid ry");
      // let {data: values, width, height} = data;
      let values = data;
      if (!((width = Math.floor(width)) >= 0)) throw new RangeError("invalid width");
      if (!((height = Math.floor(height !== undefined ? height : values.length / width)) >= 0)) throw new RangeError("invalid height");
      if (!width || !height || (!rx && !ry)) return data;
      const blurx = rx && blur(rx);
      const blury = ry && blur(ry);
      const temp = values.slice();
      if (blurx && blury) {
        blurh(blurx, temp, values, width, height);
        blurh(blurx, values, temp, width, height);
        blurh(blurx, temp, values, width, height);
        blurv(blury, values, temp, width, height);
        blurv(blury, temp, values, width, height);
        blurv(blury, values, temp, width, height);
      } else if (blurx) {
        blurh(blurx, values, temp, width, height);
        blurh(blurx, temp, values, width, height);
        blurh(blurx, values, temp, width, height);
      } else if (blury) {
        blurv(blury, values, temp, width, height);
        blurv(blury, temp, values, width, height);
        blurv(blury, values, temp, width, height);
      }
      return data;
    };
  }
  
  function blurh(blur, T, S, w, h) {
    for (let y = 0, n = w * h; y < n;) {
      blur(T, S, y, y += w, 1);
    }
  }
  
  function blurv(blur, T, S, w, h) {
    for (let x = 0, n = w * h; x < w; ++x) {
      blur(T, S, x, x + n, w);
    }
  }
  
  function blurfImage(radius) {
    const blur = blurf(radius);
    return (T, S, start, stop, step) => {
      start <<= 2;
      stop <<= 2;
      step <<= 2;
      blur(T, S, start + 0, stop + 0, step);
      blur(T, S, start + 1, stop + 1, step);
      blur(T, S, start + 2, stop + 2, step);
      blur(T, S, start + 3, stop + 3, step);
    };
  }
  
  // Given a target array T, a source array S, sets each value T[i] to the average
  // of {S[i - r], …, S[i], …, S[i + r]}, where r = ⌊radius⌋, start <= i < stop,
  // for each i, i + step, i + 2 * step, etc., and where S[j] is clamped between
  // S[start] (inclusive) and S[stop] (exclusive). If the given radius is not an
  // integer, S[i - r - 1] and S[i + r + 1] are added to the sum, each weighted
  // according to r - ⌊radius⌋.
  function blurf(radius) {
    const radius0 = Math.floor(radius);
    if (radius0 === radius) return bluri(radius);
    const t = radius - radius0;
    const w = 2 * radius + 1;
    return (T, S, start, stop, step) => { // stop must be aligned!
      if (!((stop -= step) >= start)) return; // inclusive stop
      let sum = radius0 * S[start];
      const s0 = step * radius0;
      const s1 = s0 + step;
      for (let i = start, j = start + s0; i < j; i += step) {
        sum += S[Math.min(stop, i)];
      }
      for (let i = start, j = stop; i <= j; i += step) {
        sum += S[Math.min(stop, i + s0)];
        T[i] = (sum + t * (S[Math.max(start, i - s1)] + S[Math.min(stop, i + s1)])) / w;
        sum -= S[Math.max(start, i - s0)];
      }
    };
  }
  
  // Like blurf, but optimized for integer radius.
  function bluri(radius) {
    const w = 2 * radius + 1;
    return (T, S, start, stop, step) => { // stop must be aligned!
      if (!((stop -= step) >= start)) return; // inclusive stop
      let sum = radius * S[start];
      const s = step * radius;
      for (let i = start, j = start + s; i < j; i += step) {
        sum += S[Math.min(stop, i)];
      }
      for (let i = start, j = stop; i <= j; i += step) {
        sum += S[Math.min(stop, i + s)];
        T[i] = sum / w;
        sum -= S[Math.max(start, i - s)];
      }
    };
  }