import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl{
    private _value:any
    private _rawValue:any
    public __v_isRef = true
    public dep:any
    constructor(value){
        this._rawValue = value;
        // value -> reactive
        // 1. 看看value是不是对象
        this._value = convert(value)
        
        this.dep = new Set()
    }
    get value(){
        trackRefValue(this)
        return this._value
    }
    set value(newValue){
        //newValue -> this._value
        if(hasChanged(newValue, this._rawValue)){
            this._rawValue = newValue;

            //一定先去修改了value的值
            this._value = convert(newValue)
            triggerEffects(this.dep)
        };
    }
}

function convert(value){
    return isObject(value) ? reactive(value) : value;  
}

function trackRefValue(ref:any){
    if(isTracking()){
        trackEffects(ref.dep)
    } 
}

export function ref(value){
    return new RefImpl(value)
}

export function isRef(ref) {
    return !!ref.__v_isRef;
}

export function unRef(ref) {
    // 看看是不是 ref -> ref.value
    // ref
    return isRef(ref) ? ref.value : ref;
}