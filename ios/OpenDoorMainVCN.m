//
//  OpenDoorMainVCN.m
//  AwesomeProject
//
//  Created by huangchen on 2018/10/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "OpenDoorMainVCN.h"
#import <CoreBluetooth/CoreBluetooth.h>

@interface OpenDoorMainVCN ()<CBCentralManagerDelegate>
{
  CBCentralManager *cManager;
}
@end

@implementation OpenDoorMainVCN

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  NSLog(@"title==%@",self.titleString);
    self.title = self.titleString;
    if(cManager){
      cManager = nil;
    }
    cManager = [[CBCentralManager alloc] initWithDelegate:self queue:nil options:nil];
}

-(void)viewWillAppear:(BOOL)animated{
  [super viewWillAppear:animated];
}

-(void)viewWillDisappear:(BOOL)animated{
  [super viewWillDisappear:animated];
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
