Ext.define('WhatsFresh.util.SetProductDetail', {

    singleton: true,

    setProductDetailDataAndImage: function(k){
		WhatsFresh.productDetailView.getAt(1).getComponent("productNameBlock").setData(WhatsFresh.ProductStore.data.all[k].data);
		WhatsFresh.PDimage.setData(WhatsFresh.ProductStore.data.all[k].data);
		WhatsFresh.productDetailView.getAt(1).getComponent("productInfoBlock").setData(WhatsFresh.ProductStore.data.all[k].data);
		if(WhatsFresh.ProductStore.data.all[k].data.image !== null){
			WhatsFresh.PDimage.show();
			WhatsFresh.PDimage.setSrc('http://seagrant-staging-api.osuosl.org'+ WhatsFresh.ProductStore.data.all[k].data.image.link);
			var caption = {
				cap: WhatsFresh.ProductStore.data.all[k].data.image.caption
			};
		}else{
			// Set caption
			var cap = {
				cap: "No image avalible"
			};
			WhatsFresh.PDimage.hide();
		}
	}
});
