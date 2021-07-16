package com.hanwoollim;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.Nullable;

import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactActivity;
import com.facebook.react.PackageList;
import com.facebook.react.ReactPackage;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Arrays;

public class MainActivity extends ReactActivity {

  @Override
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    super.onCreate(savedInstanceState, persistentState);
    getHashKey();
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Hanwoollim";
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new VectorIconsPackage() //Add your package here
    );
  }
  private void getHashKey(){
    PackageInfo packageInfo = null;
    try {
      packageInfo = getPackageManager().getPackageInfo(getPackageName(), PackageManager.GET_SIGNATURES);
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }
    if (packageInfo == null)
      Log.e("KeyHash", "KeyHash:null");

    for (Signature signature : packageInfo.signatures) {
      try {
        MessageDigest md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        Log.d("KeyHash", Base64.encodeToString(md.digest(), Base64.DEFAULT));
      } catch (NoSuchAlgorithmException e) {
        Log.e("KeyHash", "Unable to get MessageDigest. signature=" + signature, e);
      }
    }
  }
}
