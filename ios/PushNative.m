//
//  PushNative.m
//  AwesomeProject
//
//  Created by huangchen on 2018/10/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "PushNative.h"
#import <React/RCTEventDispatcher.h>
//导入跳转的页面
#import "OpenDoorMainVCN.h"
//导入appdelegate,获取uinavigationcontroller
#import "AppDelegate.h"
@implementation PushNative

RCT_EXPORT_MODULE();
//跳转到原生界面
RCT_EXPORT_METHOD(RNOpenOpendoorVC:(NSString *)msg){
  NSLog(@"rn传入原生界面的数据为：%@",msg);
  //主要这里必须使用主线程发送，不然有可能失效
  dispatch_async(dispatch_get_main_queue(), ^{
    OpenDoorMainVCN * openDoorVCN = [OpenDoorMainVCN new];
    UIViewController * nav = [UIApplication sharedApplication].keyWindow.rootViewController;
    [nav.navigationController pushViewController:openDoorVCN animated:NO];
  });
}


@end
