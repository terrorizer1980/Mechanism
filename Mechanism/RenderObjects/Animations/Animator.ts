﻿abstract class Animator {
    frames: KeyFrame<any>[] = [];

    protected constructor(public readonly name: string) { }

    apply(object: RenderObject, frame: number) {
        const lastFrame = this.frames.lastOrDefault((element, index) => index <= frame);
        if (!lastFrame) {
            return;
        }
        if (lastFrame.interpolation === Interpolation.None) {
            this.applyValue(object, lastFrame.value);
            return;
        }
        const nextFrame = this.frames.firstOrDefault((element, index) => index > frame);
        if (!nextFrame) {
            this.applyValue(object, lastFrame.value);
            return;
        }
        const lastIndex = this.frames.indexOf(lastFrame);
        const nextIndex = this.frames.indexOf(nextFrame);
        const amount = (frame - lastIndex) / (nextIndex - lastIndex);
        const interpolatedValue = this.interpolate(amount, lastFrame.value, nextFrame.value, lastFrame.interpolation);
        this.applyValue(object, interpolatedValue);
    }

    protected abstract applyValue(object: RenderObject, value: any): void;

    protected abstract interpolate(amount: number, from: any, to: any, interpolation: Interpolation): any;
}