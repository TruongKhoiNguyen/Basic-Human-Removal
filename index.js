let video, c_out, ctx_out, c_tmp, ctx_tmp, model;
let width, height;

const bodyPixConfig = {
    architechture: "MobileNetV1",
    outputStride: 16,
    multiplier: 1,
    quantBytes: 4,
};

const segmentationConfig = {
    internalResolution: "high",
    segmentationThreshold: 0.05,
    scoreThreshold: 0.05,
};

function init() {
    video = document.createElement('video');
    video.src = 'How People Walk.mp4';
    video.muted = true;
    video.loop = true;
    video.controls = true;

    document.body.appendChild(video);

    video.addEventListener('loadedmetadata', () => {
        if (video.videoWidth > video.videoHeight) {
            video.width = 800;
        } else {
            video.height = 600;
        }

        width = video.offsetWidth;
        height = video.offsetHeight;

        c_out = document.createElement('canvas');
        c_out.setAttribute('width', width);
        c_out.setAttribute('height', height);
        document.body.appendChild(c_out);

        ctx_out = c_out.getContext('2d');

        c_tmp = document.createElement('canvas');
        c_tmp.setAttribute('width', width);
        c_tmp.setAttribute('height', height);

        ctx_tmp = c_tmp.getContext('2d');

        video.play();
        computeFrame();
    })
}

function computeFrame() {
    ctx_tmp.drawImage(video, 0, 0, width, height);
    let frame = ctx_tmp.getImageData(0, 0, width, height);

    model.segmentPerson(c_tmp, segmentationConfig).then((segmentation) => {
        let out_image = ctx_out.getImageData(
            0,
            0,
            width,
            height
        );

        for (let x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {
                let n = x + y * 800;

                if (segmentation.data[n] == 0) {
                    out_image.data[n * 4] = frame.data[n * 4]; //R
                    out_image.data[n * 4 + 1] = frame.data[n * 4 + 1]; //G
                    out_image.data[n * 4 + 2] = frame.data[n * 4 + 2]; //B
                    out_image.data[n * 4 + 3] = frame.data[n * 4 + 3]; //A
                }
            }
        }
        ctx_out.putImageData(out_image, 0, 0);
        setTimeout(computeFrame, 0);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    bodyPix.load(bodyPixConfig).then((m) => {
        model = m;
        init();
    });
});