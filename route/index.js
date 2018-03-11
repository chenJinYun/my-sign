const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');
// 创建连接池
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myigou'
});
module.exports = () => {
    const route = express.Router();
    const getHomeStr = `SELECT product_id,product_name,product_price,product_img_url,product_uprice FROM product`;
    const getCateNames = `SELECT * FROM category ORDER BY category_id desc`;//以降序查询分类
    // 获取首页的数据
    route.get('/home', (req, res) => {
        getHomeDatas(getHomeStr, res);
    });

    function getHomeDatas(getHomeStr, res) {
        db.query(getHomeStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }

    // 获取分类名字
    route.get('/category', (req, res) => {
        getCateNamesDatas(getCateNames, res);
    });

    function getCateNamesDatas(getCateNames, res) {
        db.query(getCateNames, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    };

    // 获取分类对应的物品
    route.get('/categorygoods', (req, res) => {
        let mId = req.query.mId;
        const sql = `select * from product,category where product.category_id=category.category_id and category.category_id='${mId}'`;
        getCateGoods(sql, res);
    });

    function getCateGoods(sql, res) {
        db.query(sql, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }

    // 获取物品的图片
    route.get('/detail', (req, res) => {
        let produId = req.query.mId;
        const imagesStr = `select image_url from product_image where product_id='${produId}'`;
        const productStr = `select * from product where product_id='${produId}'`;
        let detailDatas = [];
        db.query(imagesStr, (err, imgDatas) => {
            if (err) {
                console.error(err);
                res.status(500).send('database err').end();
            } else {
                detailDatas.push(imgDatas);
                db.query(productStr, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database err').end();
                    } else {
                        detailDatas.push(data);
                        res.send(detailDatas);
                    }
                });
            }
        });
    });

    // 获取购物车的数据
    route.get('/cart', (req, res) => {
        let user_id = req.query.id
        const cartStr = `SELECT cart_id,user.user_id,product.product_id,product_name,product_uprice,product_img_url,goods_num,product_num,shop_name FROM product,user,goods_cart,shop where product.product_id=goods_cart.product_id and user.user_id=goods_cart.user_id and shop.shop_id = product.shop_id and goods_cart.user_id=${user_id}`;
        getCartData(cartStr, res)
    })
    function getCartData(cartStr, res) {
        db.query(cartStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                res.send(data);
            }
        });
    }
    // 删除购物车数据
    route.post('/cart', (req, res) => {
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        let id = mObj.cart_id
        let user_id = mObj.user_id
        const delcartStr = `DELETE FROM goods_cart WHERE cart_id = ${id}`;
        db.query(delcartStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                const cartStr = `SELECT cart_id,user.user_id,product.product_id,product_name,product_uprice,product_img_url,goods_num,product_num,shop_name FROM product,user,goods_cart,shop where product.product_id=goods_cart.product_id and user.user_id=goods_cart.user_id and shop.shop_id = product.shop_id and goods_cart.user_id=${user_id}`;
                getCartData(cartStr,res)
                }
            }
        });
    })
    // 加入购物车
    route.post('/addCart', (req, res) => {
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        // 查询数据是否存在，进行不同的操作
        const queryStr = `SELECT * FROM goods_cart where user_id = ${mObj.user_id} and product_id = ${mObj.product_id}`
        const addStr = `INSERT INTO goods_cart(user_id,product_id,goods_num,created) VALUES (${mObj.user_id}, ${mObj.product_id}, ${mObj.goods_num},${mObj.created});`;
        const updateStr = `UPDATE goods_cart SET goods_num = (goods_num+1) WHERE user_id = ${mObj.user_id} and product_id = ${mObj.product_id}`;
        db.query(queryStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('fail').end();
            } else {
                if (data.length) {
                    db.query(updateStr, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('fail').end();
                        } else {
                           res.send(true)
                        }
                    });
                } else {
                    db.query(addStr, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('fail').end();
                        } else {
                           res.send(true)
                        }
                    });
                }
            } 
        })
    })
    // 查询（根据热度，价格，关键字）
    route.get('/search', (req, res) => {
        let keyWord = req.query.kw;
        let hot = req.query.hot;
        let priceUp = req.query.priceUp;
        let priceDown = req.query.priceDown;
        const keywordStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%'`;
        const keywordStrAll = `select  *  from product,shop where product.shop_id=shop.shop_id`;
        const hotStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_comment_num desc`;
        const hotStrAll = `select  *  from product,shop where product.shop_id=shop.shop_id order by product_comment_num desc`;
        const priceUpStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice asc`;
        const priceUpStrAll = `select  *  from product,shop where product.shop_id=shop.shop_id order by product_uprice asc`;
        const priceDownStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice desc`;
        const priceDownStrAll = `select  *  from product,shop where product.shop_id=shop.shop_id order by product_uprice desc`;
        if (keyWord != '') {
            if (hot != '') {
                getSearchDatas(hotStr, res);
            } else if (priceUp != '') {
                getSearchDatas(priceUpStr, res);
            } else if (priceDown != '') {
                getSearchDatas(priceDownStr, res);
            } else {
                getSearchDatas(keywordStr, res);
            }
        } else {
            if (hot != '') {
                getSearchDatas(hotStrAll, res);
            } else if (priceUp != '') {
                getSearchDatas(priceUpStrAll, res);
            } else if (priceDown != '') {
                getSearchDatas(priceDownStrAll, res);
            } else {
                getAllSearchData(keywordStrAll, res)
            }
        }

    });
    // 获取全部的数据
    function getAllSearchData(keywordStrAll,res) {
        db.query(keywordStrAll, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else{
                res.send(data);
            }
        })
    }
    // 获取查询数据
    function getSearchDatas(keywordStr, res) {
        db.query(keywordStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }

    // 注册
    route.post('/reg', (req, res) => {
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        let regName = mObj.regName;
        let regPasswd = mObj.regPasswd;
        regPasswd = common.md5(regPasswd + common.MD5_SUFFXIE);
        const insUserInfo = `INSERT INTO user(user_name,login_password,user_number) VALUES('${regName}','${regPasswd}','${regName}')`;
        delReg(insUserInfo, res);
    });
    // 注册的方法
    function delReg(insUserInfo, res) {
        db.query(insUserInfo, (err) => {
            if (err) {
                console.error(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                res.send({ 'msg': '注册成功', 'status': 1 }).end();
            }
        })
    };

    // 登录
    route.post('/login', (req, res) => {
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
            console.log(mObj);
        }
        let username = mObj.loginName;
        let password = common.md5(mObj.loginPawd + common.MD5_SUFFXIE);;
        // console.log(username, mObj.passwd);
        const selectUser = `SELECT * FROM user where user_name='${username}'`;
        db.query(selectUser, (err, data) => {
            if (err) {
                console.log(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                if (data.length == 0) {
                    res.send({ 'msg': '该用户不存在', 'status': -1 }).end();
                } else {
                    let dataw = data[0];
                    //login sucess
                    if (dataw.login_password === password) {
                        //save the session 
                        req.session['user_id'] = dataw.user_id;
                        dataw.msg = "登录成功";
                        dataw.status = 1;
                        res.send(dataw).end();
                    } else {
                        res.send({ 'msg': '密码不正确', 'status': -2 }).end();
                    }
                }
            }
        });
    });

    // 获取用户信息
    route.get('/userinfo', (req, res) => {
        let uId = req.query.uId;
        const getU = `SELECT user_name,user_number FROM user where user_id='${uId}'`;
        db.query(getU, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data[0]);
                }
            }
        });
    });
    return route;
}
