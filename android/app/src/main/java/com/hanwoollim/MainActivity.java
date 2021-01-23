package com.hanwoollim;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactActivity;
import com.facebook.react.PackageList;
import com.facebook.react.ReactPackage;

import java.util.List;
import java.util.Arrays;

public class MainActivity extends ReactActivity {

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
}
