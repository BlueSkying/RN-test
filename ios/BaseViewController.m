//
//  BaseViewController.m
//  AwesomeProject
//
//  Created by huangchen on 2018/10/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "BaseViewController.h"
#import "MBProgressHUD.h"
@interface BaseViewController ()
{
  MBProgressHUD *hud;
}
@end

@implementation BaseViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
     self.view.backgroundColor = [UIColor whiteColor];
}

-(void)showProgress:(NSString *)message withCtr:(UIViewController *)viewControl withDismiss:(BOOL)dimiss{
  dispatch_async(dispatch_get_main_queue(), ^{
    // do what you want to do.
    [self hideHud];
    if(!viewControl.navigationController.view){
      return;
    }
    hud = [MBProgressHUD showHUDAddedTo:viewControl.navigationController.view animated:YES];
    //设置是否允许用户编辑
    hud.userInteractionEnabled=NO;
    // 隐藏时候从父控件中移除
    hud.removeFromSuperViewOnHide = YES;
    hud.labelText = message;
    if(dimiss){
      hud.mode = MBProgressHUDModeText;
      [hud hide:YES afterDelay:2];
    }else{
      hud.mode = MBProgressHUDModeIndeterminate;
    }
  });
}

-(void)hideHud{
  if(hud){
    [hud removeFromSuperview];
    hud = nil;
  }
}

-(void)viewWillAppear:(BOOL)animated{
  [super viewWillAppear:animated];
  self.navigationController.navigationBar.hidden = NO;
  [self.navigationController setNavigationBarHidden:NO animated:YES];
}

-(void)viewWillDisappear:(BOOL)animated{
  [super viewWillDisappear:animated];
  self.navigationController.navigationBar.hidden = YES;
  [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
