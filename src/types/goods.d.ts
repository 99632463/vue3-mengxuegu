declare interface GoodsQuery {
   keyword: string;  //商品名称、编码、解码
   status: number;   //状态
}

declare interface GoodsType {
   id: string; 
   code: string; 
   name: string; 
   imageUrl: string; 
   quickCode: string; 
   specsName: string; 
   unitName: string; 
   categoryId: string; 
   categoryName: string; 
   cost: number;
   stockNum: number;
   price: number;
   discountPrice: number;
   score: number;
   address:string; 
   brand: string; 
   status: number;
   sort: number;
   remark: string; 
   goodsDetail: string; 
   createTime: string; 
   updateTime:string; 
}