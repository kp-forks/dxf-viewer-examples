import * as THREE from "three";
import { DxfObject } from "../dxf/DxfObject";
/**
 * @internal
 */
export interface MaterialInfo {
    id: number;
    material?: THREE.Material;
    clonedMaterial?: THREE.Material;
    opacity: number;
    transparent: boolean;
    side: THREE.Side;
}
/**
 * Util class for Threejs Object
 * @internal
 */
export declare class ObjectUtils {
    /**
     * Clears any styles, including transparency, wireframe mode, filter by floor, etc.
     * @param object
     */
    static resetObjectStyle(object: THREE.Object3D): void;
    /**
     * Clears any styles, including transparency, wireframe mode, filter by floor, etc.
     */
    static resetObjectStyleById(scene: THREE.Scene, id: number): void;
    /**
     * Sets an object's opacity
     * @returns returns MaterialInfo list in case caller want to revert the opacity
     */
    static setObjectOpacity(object: THREE.Object3D, opacity?: number, includeObjectIds?: number[], excludeObjectIds?: number[]): MaterialInfo[];
    /**
     * Reverts an object's opacity
     * @param object the root object
     */
    static revertObjectOpacity(object: THREE.Object3D, materialInfoList: MaterialInfo[], includeObjectIds?: number[], excludeObjectIds?: number[]): void;
    /**
     * Sets an object's opacity
     */
    static setObjectOpacityById(scene: THREE.Scene, id: number, opacity?: number, includeObjectIds?: number[], excludeObjectIds?: number[]): MaterialInfo[];
    /**
     * Reverts an object's opacity
     */
    static revertObjectOpacityById(scene: THREE.Scene, id: number, materialInfoList: MaterialInfo[], includeObjectIds?: number[], excludeObjectIds?: number[]): void;
    /**
     * Applies material to an object, including its children
     * The originalMaterial will be saved to userData in case user want to revert it
     */
    static applyMaterialToObject(object: THREE.Object3D, material: THREE.Material | THREE.Material[], includeObjectIds?: number[], excludeObjectIds?: number[]): void;
    /**
     * Revert applied material to an object, including its children
     */
    static revertAppliedMaterialToObject(object: THREE.Object3D, includeObjectIds?: number[], excludeObjectIds?: number[]): void;
    /**
     * Sets an object's opacity
     */
    static applyMaterialToObjectById(scene: THREE.Scene, id: number, material: THREE.Material | THREE.Material[], includeObjectIds?: number[], excludeObjectIds?: number[]): void;
    /**
     * Reverts an object's opacity
     */
    static revertAppliedMaterialToObjectById(scene: THREE.Scene, id: number, includeObjectIds?: number[], excludeObjectIds?: number[]): void;
    /**
     * Applies a default opacity material to an object, including its children
     */
    static applyOpacityMaterialToObject(object: THREE.Object3D, includeObjectIds?: number[], excludeObjectIds?: number[]): void;
    /**
     * Sets double-sided material to an object, including its children
     * The originalSide will be saved to userData in case user want to revert it
     */
    static setDoubleSidedMaterialToObject(object: THREE.Object3D): void;
    /**
     * Revert double-sided material to an object, including its children
     */
    static revertDoubleSidedMaterialToObject(object: THREE.Object3D): void;
    /**
     * Sets an object to be wireframe mode.
     * In order to revert wireframe mode, we'll store original material in userData: \{
     *   materialForWireframe: THREE.Material
     * \}
     * It seems wireframe mode have performance degradation, look at here for more info:
     * https://stackoverflow.com/questions/45917611/shader-wireframe-of-an-object
     */
    static setWireframeMode(object: THREE.Object3D): void;
    /**
     * Sets an object to be wireframe mode.
     */
    static setWireframeModeById(scene: THREE.Scene, id: number): void;
    /**
     * Reverts an object to be non-wireframe mode.
     */
    static revertWireframeMode(object: THREE.Object3D): void;
    /**
     * Reverts an object to be non-wireframe mode.
     */
    static revertWireframeModeById(scene: THREE.Scene, id: number): void;
    /**
     * Finds objects by name, id, userData, etc.
     * @param scene
     * @param targetIds target object ids to find from
     * @param searchText search text
     * @param findFirst only find the first
     */
    private static findInner;
    /**
     * Finds objects by given string
     */
    static find(scene: THREE.Scene, searchText: string, targetIds?: number[], findFirst?: boolean): THREE.Object3D[];
    /**
     * Finds the first object by given string
     */
    static findFirst(scene: THREE.Scene, searchText: string, targetIds?: number[], findFirst?: boolean): THREE.Object3D | undefined;
    /**
     * Checks if given string contains floor
     * @param str string to match, e.g. '5F(xxx)'
     */
    private static getFloorsFromString;
    /**
     * Matches if a string contains floor string
     * @param str string to match, e.g. '5F(xxx)'
     * @param floor '5F', etc.
     */
    private static matchFloor;
    /**
     * Matches if a string contains one of floor string in floors
     * @param str string to match, e.g. '5F(xxx)'
     * @param floor '5F', etc.
     */
    private static matchFloors;
    /**
     * Distincts/find floors from models, by checking children object.name
     */
    static distinctFloors(scene: THREE.Scene, modelId: number[]): string[];
    /**
     * Sets object's visible to true if its name, etc. match one of given floor.
     * This method won't affect other objects that don't match.
     */
    static traverseObjectByFloors(scene: THREE.Scene, objectId: number, floors: number[], matchCallback?: (object: THREE.Object3D) => void, unmatchCallback?: (object: THREE.Object3D) => void): never[] | undefined;
    /**
     * Sets object belong to given floors to be visible
     * @param objectId root or parent object id
     * @param makeUnmatchedInvisible if it should make unmatched object invisible
     */
    static setVisibleForFloors(scene: THREE.Scene, objectId: number, floors: number[], makeUnmatchedInvisible?: boolean): void;
    static revertVisibleForFloors(object: THREE.Object3D): void;
    static revertVisibleForFloorsById(scene: THREE.Scene, id: number): void;
    private static getObjectById;
    /**
     * Outline default material
     */
    private static OUTLINE_MATERIAL;
    /**
     * Creates outlines for given object and children
     */
    static createOutlines(object: THREE.Object3D, options?: {
        onlyVisible: boolean;
        meshOnly: boolean;
    }, onProgress?: (event: ProgressEvent) => void): Promise<THREE.LineSegments[]>;
    /**
     * Recursively removes outlines for given object and children
     */
    static removeOutlines(object: THREE.Object3D): void;
    /**
     * Checks if an object has outline already
     * @param checkChildren If it checks children recursively.
     */
    static hasOutline(object: THREE.Object3D, checkChildren?: boolean): boolean;
    /**
     * Sets outline visiblility for given object and children
     */
    static setOutlinesVisibility(object: THREE.Object3D, visible: boolean): void;
    /**
     * Creates outline for given geometry
     */
    static createOutline(geometry: THREE.BufferGeometry, material?: THREE.LineBasicMaterial, matrix?: THREE.Matrix4): THREE.LineSegments;
    /**
     * Clones object
     * @param object target object to be cloned
     * @param cloneMaterial if it needs to clone material or not
     * @returns cloned object
     */
    static cloneObject(object: THREE.Object3D, cloneMaterial?: boolean): THREE.Object3D;
    private static BOX_FACE_MATERIAL;
    /**
     * Creates box mesh
     */
    static createBox(sizeX: number, sizeY: number, sizeZ: number, faceMaterial?: THREE.Material, withBottom?: boolean): THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material, THREE.Object3DEventMap>;
    /**
     * TODO: Relative to center
     */
    static rebaseObjectOnRTC(object: THREE.Object3D): THREE.Object3D;
    static isEmptyObject(object: THREE.Object3D | DxfObject): boolean;
    static removeEmptyObjects(object: THREE.Object3D | DxfObject): boolean;
    /**
     * From bottom to top, removes child objects first,
     * and then removes empty parent objects
     */
    static removeEmptyObjectsFromRemovingObjects(removingObjects: THREE.Object3D[], levelObject: THREE.Object3D): void;
    /**
     * To save memory, object3d shares some variables
     */
    static setSharedVariablesOfObject(object: THREE.Object3D): void;
    /**
     * Checks if an object is a drawable leaf object
     */
    static isLeafObject(obj: THREE.Object3D): boolean;
    /**
     * object layers related setting functions
     */
    static enableLayerChannels(obj: THREE.Object3D, channels: number[], recursive?: boolean): void;
    static disableLayerChannels(obj: THREE.Object3D, channels: number[], recursive?: boolean): void;
    static setLayerChannels(obj: THREE.Object3D, channels: number[], recursive?: boolean): void;
    static isObjectHittable(obj: THREE.Object3D): boolean;
    static isObjectSnapable(obj: THREE.Object3D): boolean;
    static isObjectSelectable(obj: THREE.Object3D): boolean;
}
