//
//  BaseViewController.h
//  AwesomeProject
//
//  Created by huangchen on 2018/10/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface BaseViewController : UIViewController

-(void)showProgress:(NSString *)message withCtr:(UIViewController *)viewControl withDismiss:(BOOL)dimiss;

-(void)hideHud;

@end
