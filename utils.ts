import { ref } from 'vue'
import { UseIntersectionObserverOptions, useIntersectionObserver } from '@vueuse/core'
import { stagger, timeline } from "motion";

export function inView(target: any, callback: (entry: IntersectionObserverEntry) => void, options: UseIntersectionObserverOptions = {}) {
    const { stop } = useIntersectionObserver(
        target,
        (entries, observerElement) => {
            entries.forEach((entry) => {
                console.log(entry, observerElement);
                if (entry.isIntersecting) {
                    callback(entry);
                    observerElement.unobserve(entry.target);
                }
            })
        },
        options
    )
    return stop;
}


export function heroInView(hero: Ref<HTMLElement | null>) {
    inView(hero, ({ target }) => {
        console.log('heroInView');
        timeline(
            [
                [
                    target.querySelectorAll('.staggared'),
                    { opacity: [0, 1], transform: ['translateY(100px)', 'none'] },
                    { delay: stagger(0.2, { start: 0 }), duration: 1, easing: [0.17, 0.55, 0.55, 1] }
                ],
                [
                    target.querySelectorAll('.img'),
                    { opacity: [0, 1], transform: ['translateX(100px)', 'none'] },
                    { at: 0.3, duration: 1, easing: [0.17, 0.55, 0.55, 1] }
                ]
            ],
            { delay: 0, duration: 1.2, defaultOptions: { easing: [0.17, 0.55, 0.55, 1] } }
        );
    }, {
    });
}
