package com.awesomeproject.wxapi;

/**
 * Created by terryloveu on 2018/10/20.
 */
import android.app.Activity;
import android.os.Bundle;

import com.theweflex.react.WeChatModule;

public class WXEntryActivity extends Activity{
    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();
    }
}
