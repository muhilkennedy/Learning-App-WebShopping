import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { ProductService } from '../../../shared/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Node for category
 */
export class ItemNode {
  children: ItemNode[];
  item: string;
  catId: number;
  catName: string;
}

/** Flat category item node with expandable and level information */
export class ItemFlatNode {
  item: string;
  catId: number;
  catName: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
let TREE_DATA = {

};


/**
 * build a tree structured Json object.
 * Each node in Json object represents a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class nodeService {
  dataChange = new BehaviorSubject<ItemNode[]>([]);

  get data(): ItemNode[] { return this.dataChange.value; }

  constructor(private productService: ProductService, private _snackBar: MatSnackBar) {
    this.productService.getCategories()
                        .subscribe((resp:any)=> {
                          if(resp.statusCode === 200){
                            TREE_DATA = resp.data;
                            this.initialize();
                          }
                          else{
                            this._snackBar.open('Error : ' + resp.errorMessages, '', {
                              duration: 3000,
                              panelClass: ['error-snackbar']
                            });
                          }
                        },
                        (error:any) => {
                          this._snackBar.open('Something went wrong!', '', {
                            duration: 3000,
                            panelClass: ['error-snackbar']
                          });
                        })
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `ItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `ItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): ItemNode[] {
    return Object.keys(obj).reduce<ItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new ItemNode();
      node.item = key;
      node.catId = parseInt(key.split(",")[0]);
      node.catName = key.split(",")[1];
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
          node.catId = parseInt(key.split(",")[0]);
          node.catName = key.split(",")[1];
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to list */
  insertItem(parent: ItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as ItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: ItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [nodeService]
})
export class CategoryComponent implements OnInit {

  loading = false;
  catName: string;
  parentId: number;

  editCatId: number;
  editCatName: string;

  addNewItemParent: any;

  ngOnInit(): void {
  }
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ItemFlatNode, ItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<ItemNode, ItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: ItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<ItemFlatNode>;

  treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;

  dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ItemFlatNode>(true /* multiple */);

  constructor(private nodeService: nodeService, private productService: ProductService,
              private _snackBar: MatSnackBar) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    nodeService.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: ItemFlatNode) => node.level;

  isExpandable = (node: ItemFlatNode) => node.expandable;

  getChildren = (node: ItemNode): ItemNode[] => node.children;

  hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: ItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: ItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new ItemFlatNode();
    flatNode.item = node.item;
    flatNode.catId = node.catId;
    flatNode.catName = node.catName;
    flatNode.level = level;
    flatNode.expandable = true;//(node.children != undefined && node.children.length) > 0 ? true : false;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the item selection. Select/deselect all the descendants node */
  ItemSelectionToggle(node: ItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf item selection. Check all the parents to see if they changed */
  LeafItemSelectionToggle(node: ItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: ItemFlatNode): void {
    let parent: ItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: ItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: ItemFlatNode): ItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: ItemFlatNode) {
    // node.expandable = true;
    const parentNode = this.flatNodeMap.get(node);
    if(parentNode.children === undefined || parentNode.children === null || parentNode.children.length <= 0)
    {
      parentNode.children = new Array();
    }

    this.addNewItemParent = parentNode;
    this.nodeService.insertItem(parentNode!, '');
    this.treeControl.expand(node);

  }

  /** Save the node to database */
  saveNode(node: ItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.nodeService.updateItem(nestedNode!, itemValue);

    this.catName = itemValue;
    this.parentId = this.addNewItemParent.catId;
    this.createCategory();
  }

  showExpand(node: ItemFlatNode){
    const flatNode = this.flatNodeMap.get(node);
    if(flatNode === undefined || flatNode.children === undefined || flatNode.children === null){
      return 'hidden';
    }
    else if(flatNode.children.length > 0)
    {
      return 'visible';
    }
    else{
      return 'hidden';
    }
  }

  deleteCategory(){
    this.loading = true;
    let deleteCategories:number[] = new Array();
    this.checklistSelection.selected.forEach(node => {
      deleteCategories.push(node.catId);
    });
    this.productService.deleteCategory(deleteCategories)
                        .subscribe((resp:any)=> {
                          if(resp.statusCode === 200){
                            TREE_DATA = resp.data != null ? resp.data : {};
                            this.nodeService.initialize();
                            this._snackBar.open('Category Deleted Successfully', '', {
                              duration: 3000,
                              panelClass: ['warn-snackbar']
                            });
                          }
                          else{
                            this._snackBar.open('Error : ' + resp.errorMessages, '', {
                              duration: 3000,
                              panelClass: ['error-snackbar']
                            });
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this._snackBar.open('Something went wrong !', '', {
                            duration: 3000,
                            panelClass: ['error-snackbar']
                          });
                        })
  }

  createCategory(){
    this.loading = true;
    this.productService.createCategory(this.catName, this.parentId)
                        .subscribe((resp:any)=> {
                          if(resp.statusCode === 200){
                            TREE_DATA = resp.data;
                            this.nodeService.initialize();
                            this._snackBar.open('Category Added Successfully', '', {
                              duration: 3000,
                              panelClass: ['success-snackbar']
                            });
                          }
                          else{
                            this._snackBar.open('Error : ' + resp.errorMessages, '', {
                              duration: 3000,
                              panelClass: ['error-snackbar']
                            });
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this._snackBar.open('Something went wrong !', '', {
                            duration: 3000,
                            panelClass: ['error-snackbar']
                          });
                        })

  }

  editCategory(){
    this.loading = true;
    this.productService.editCategoryName(this.editCatId, this.editCatName)
                        .subscribe((resp:any)=> {
                          if(resp.statusCode === 200){
                            TREE_DATA = resp.data;
                            this.nodeService.initialize();
                            this._snackBar.open('Category Modified Successfully', '', {
                              duration: 3000,
                              panelClass: ['success-snackbar']
                            });
                          }
                          else{
                            this._snackBar.open('Error : ' + resp.errorMessages, '', {
                              duration: 3000,
                              panelClass: ['error-snackbar']
                            });
                          }
                          this.loading = false;
                        },
                        (error:any) => {
                          this._snackBar.open('Something went wrong !', '', {
                            duration: 3000,
                            panelClass: ['error-snackbar']
                          });
                        })
  }

}
