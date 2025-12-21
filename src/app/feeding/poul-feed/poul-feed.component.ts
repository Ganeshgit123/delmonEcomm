import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  id: number;
  name: string;
  children: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: number;
  level: number;
}

@Component({
    selector: 'app-poul-feed',
    templateUrl: './poul-feed.component.html',
    styleUrls: ['./poul-feed.component.css'],
    standalone: false
})

export class PoulFeedComponent {
  selectedCategoryId: any;
  categoryList: any = [];
  subCategoryId: any;
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.selectedCategoryId = params['id'];
    });
    this.getdata();
    //this.dataSource.data = TREE_DATA;
    //console.log(this.dataSource.data);
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getdata() {
    this.auth.getSubcategory(this.selectedCategoryId).subscribe((res: any) => {
      var firtData = res.data;
      firtData.forEach((element: any) => {
        this.auth.getSubcategory(element.id).subscribe((res: any) => {
          element.children = res.data;


          this.categoryList = firtData;
          // console.log("ddd", this.categoryList)
          element.children.forEach((element: any) => {
            this.GetSubCategoryId(element);
            const TREE_DATA: FoodNode[] = this.categoryList;
            this.dataSource.data = TREE_DATA;
          })
          const TREE_DATA: FoodNode[] = this.categoryList;
          this.dataSource.data = TREE_DATA;
        })
      });
      const TREE_DATA: FoodNode[] = this.categoryList;
      this.dataSource.data = TREE_DATA;
      // console.log("sfe", TREE_DATA)
      // console.log("ddd", this.categoryList)
    })
  }

  GetSubCategoryId(item: any) {
    let list: any;
    this.auth.getSubcategory(item.id).subscribe((res: any) => {
      this.addChild(this.categoryList, 'id', item.id).children = res.data;

      const TREE_DATA: FoodNode[] = this.categoryList;
      this.dataSource.data = TREE_DATA;
    });

  }

  addChild(collection: any, key: any, value: any) {
    for (const o of collection) {
      for (const [k, v] of Object.entries(o)) {
        if (k === key && v === value) {
          return o
        }
        if (Array.isArray(v)) {
          const _o: any = this.addChild(v, key, value)
          if (_o) {
            return _o
          }
        }
      }
    }
  }

  Get(node: any) {
    this.subCategoryId = node.id;
  }
}
