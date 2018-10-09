//
//  OpenDoorMainVCN.m
//  AwesomeProject
//
//  Created by huangchen on 2018/10/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "OpenDoorMainVCN.h"
#import <CoreBluetooth/CoreBluetooth.h>
#import "MBProgressHUD.h"
@interface OpenDoorMainVCN ()<CBCentralManagerDelegate>
{
  CBCentralManager *cManager;
  MBProgressHUD *hud;
}
@end

@implementation OpenDoorMainVCN

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.title = NSLocalizedString(@"一键开门", @"一键开门");
    if(cManager){
      cManager = nil;
    }
    cManager = [[CBCentralManager alloc] initWithDelegate:self queue:nil options:nil];
}

-(void)centralManagerDidUpdateState:(CBCentralManager *)central
{
  if(central.state==CBCentralManagerStatePoweredOn)
  {
    NSLog(@"ble on");
  }
  else
  {
    NSLog(@"ble off");
    [self showProgress:@"请打开蓝牙才能使用此功能" withCtr:self withDismiss:YES];
  }
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
