class SLIDER{
    constructor(options) {
        this.slider = document.querySelector(options.slider);
        this.sliderLine = this.slider.querySelector('.slider__line');
        this.slides = [...this.sliderLine.children];
        this.next = this.slider.querySelector('.slider__next');
        this.prev = this.slider.querySelector('.slider__prev');

        this.dir = options.direction.toUpperCase() == 'X' ? 'X' : 'Y';
        this.timeMove = options.time != undefined ? options.time : 1000;
        this.width = this.sliderLine.clientWidth;
        this.height = this.sliderLine.clientHeight;
        this.moveSize = this.dir == 'X' ? this.width : this.height;
        this.interval = options.interval ?? this.timeMove;
        this.autoplay = options.autoplay;
        this.activeSlide = 0;

        this.sliderLine.style = `position:relative;
                                 height: ${this.height}px;
                                 overflow:hidden;`;
        this.slides.forEach((slide,i)=> {
            slide.style = `position:absolute;
                           width: ${this.width}px;
                           height: ${this.height}px;`
            if(i != this.activeSlide) {
                slide.style.transform = `translate${this.dir}(${this.moveSize}px)`;
            }
            if(i == this.slides.length - 1) {
                slide.style.transform = `translate${this.dir}(${-this.moveSize}px)`;
            }
        });
        this.autoplaying() 
        this.next.addEventListener('click', () => this.move(this.next));
        this.prev.addEventListener('click', () => this.move(this.prev));
    }

    move(btn) {

        this.disableBtn();


        let btnLeftOrRight = btn == this.next ? -this.moveSize : this.moveSize;
        this.slides.forEach((slide,i) => {
            slide.style.transition = '0ms';
            if(i != this.activeSlide) {
                slide.style.transform = `translate${this.dir}(${-btnLeftOrRight}px)`;
            }
        })
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`;
        this.slides[this.activeSlide].style.transition = this.timeMove + 'ms';
        if(btn == this.next) {
            this.activeSlide++
            if(this.activeSlide == this.slides.length) {
                this.activeSlide = 0;
            }
        }else if(btn == this.prev) {
            this.activeSlide--
            if(this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1
            }
        }
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`;
        this.slides[this.activeSlide].style.transition = this.timeMove + 'ms';
    }
    disableBtn() {
        this.next.disabled = true
        this.prev.disabled = true
        setTimeout(() => {
            this.next.disabled = false
            this.prev.disabled = false
        }, this.timeMove)
    }
    autoplaying() {
        if(this.autoplay === true) {
            let interval = setInterval(() => {
                this.move(this.next)
            },this.interval);
            this.slider.addEventListener('mouseenter', () => {
                clearInterval(interval);
            })
            this.slider.addEventListener('mouseleave', () => {
                interval = setInterval(() => {
                    this.move(this.next)
                },this.interval);
            })
        }
    }
}

let slider = new SLIDER({
    slider: '.slider',
    direction: 'x',
    time: 1000,
    autoplay: true,
    interval: 3000
});