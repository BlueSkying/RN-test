/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
#ifdef DEBUG //开发环境
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else //生产环境
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"AwesomeProject" initialProperties:nil launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  UIView *launchScreenView = [[[NSBundle mainBundle] loadNibNamed:@"LaunchScreen" owner:self options:nil] objectAtIndex:0];
  launchScreenView.frame = self.window.bounds;
  rootView.loadingView = launchScreenView;

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.nav = [[UINavigationController alloc]initWithRootViewController:rootViewController];
  self.window.rootViewController = self.nav;
  [self.window makeKeyAndVisible];
  self.nav.navigationBar.hidden = YES;
  return YES;
}
//微信添加
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

@end
