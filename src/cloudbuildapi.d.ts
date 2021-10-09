// cloudbuildapi.d.ts was created automatically by typegen (openapi-client-axios-typegen) with cloudbuildapi.json (which is provided by Unity Cloud Build API)
// but I modified a bit so that it compiles.

import {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Paths {
  namespace AddBuildTarget {
    export interface BodyParameters {
      options: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        name?: string;
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        enabled?: boolean;
        settings?: {
          /**
           * start builds automatically when your repo is updated
           */
          autoBuild?: boolean;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * attempt to automatically detect which unity version to use, fallback to specified unityVersion if unable to.
           */
          autoDetectUnityVersion?: boolean;
          /**
           * attempt to get a similar unity patch version to use, applies to unavailable auto-detected Unity versions only.
           */
          fallbackPatchVersion?: boolean;
          executablename?: string;
          scm?: {
            type?: "git" | "svn" | "p4" | "hg" | "collab" | "oauth" | "plastic";
            /**
             * Which repo to use. Only applies to Plastic SCM, other SCM types configure repo on the project level.
             */
            repo?: string;
            branch?: string;
            /**
             * subdirectory to build from
             */
            subdirectory?: string;
            /**
             * perforce only client workspace to build from
             */
            client?: string;
          };
          platform?: {
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * 'latest' or a supported xcode version (ex. 'xcode7')
             */
            xcodeVersion?: string;
          };
          /**
           * For Scheduling builds
           */
          buildSchedule?: {
            isEnabled?: boolean;
            date?: string; // date-time
            repeatCycle?: "none" | "once" | "daily" | "weekly" | "monthly" | "yearly";
            cleanBuild?: boolean;
          };
          autoBuildCancellation?: boolean;
          gcpBetaOptIn?: boolean;
          gcpOptOut?: boolean;
          advanced?: {
            xcode?: {
              useArchiveAndExport?: boolean;
              /**
               * The path (including file name) from the project root to the custom FastLane configuration json file to configure multiple provisioning files, or customize the FastLane build process.
               * See https://forum.unity.com/threads/xcode-9-multiple-provisioning-profiles.545121/
               * Will look for Assets/ucb_xcode_fastlane.json by default, if not specified.
               */
              customFastlaneConfigPath?: string;
              /**
               * Only used with OSX targets, this triggers signing and notarization process for the executable.
               */
              shouldNotarize?: boolean;
            };
            android?: {
              buildAppBundle?: boolean;
              buildAssetPacks?: boolean;
            };
            unity?: {
              /**
               * The fully-qualified name of a public static method you want us to call before we start the Unity build process.
               * For example: ClassName.NeatMethod or NameSpace.ClassName.NeatMethod.
               * No trailing parenthesis, and it can't have the same name as your Post-Export method!
               */
              preExportMethod?: string;
              /**
               * The fully-qualified name of a public static method you want us to call after we finish the Unity build process
               * (but before Xcode). For example: ClassName.CoolMethod or NameSpace.ClassName.CoolMethod. No trailing parenthesis,
               * and it can't have the same name as your Post-Export method! This method must accept a string parameter, which
               * will receive the path to the exported Unity player (or Xcode project in the case of iOS).
               */
              postExportMethod?: string;
              /**
               * Relative path to the script that should be run before the build process starts.
               */
              preBuildScript?: string;
              /**
               * Relative path to the script that should be run after the build process finishes.
               */
              postBuildScript?: string;
              /**
               * If this is true, a non-zero exit code on your preBuildScript will cause your build to be marked as Failed
               */
              preBuildScriptFailsBuild?: boolean;
              /**
               * If this is true, a non-zero exit code on your postBuildScript will cause your build to be marked as Failed
               */
              postBuildScriptFailsBuild?: boolean;
              /**
               * Enter the names of the symbols you want to define for iOS. These symbols can then be used as the conditions
               * for #if directives just like the built-in ones. (i.e. #IF MYDEFINE or #IF AMAZON)
               */
              scriptingDefineSymbols?: string;
              playerExporter?: {
                /**
                 * A list of scenes to build overriding those specified in the Build Settings menu of your Unity project.
                 */
                sceneList?: string[];
                /**
                 * Unity Editor build options. Use BuildOptions.Development and BuildOptions.AllowDebugging to create a development build.
                 */
                buildOptions?: string[];
                /**
                 * Enable exporting a player from Unity (i.e. running BuildPipeline.BuildPlayer). Enabling this is equivalent to disabling
                 * Content-only Build in Build Target on Developer Dashboard. In general, this should be true, unless you are doing something
                 * something like an asset bundle only build or unit test only build without generating an actual build artifact.
                 */
                export?: boolean;
              };
              playerSettings?: {
                Android?: {
                  /**
                   * break up android apk into an installable apk and expansion files
                   */
                  useAPKExpansionFiles?: boolean;
                };
              };
              editorUserBuildSettings?: {
                /**
                 * which android build system to build with (android only, supported in Unity 5.5+)
                 */
                androidBuildSystem?: "internal" | "gradle";
              };
              assetBundles?: {
                /**
                 * enable asset bundle builds for this target
                 */
                buildBundles?: boolean;
                /**
                 * base path relative to Assets folder where asset bundles are output. Default is 'AssetBundles'
                 */
                basePath?: string;
                /**
                 * comma separated list of flags from BuildAssetBundleOptions. see https://docs.unity3d.com/ScriptReference/BuildAssetBundleOptions.html
                 */
                buildAssetBundleOptions?: string;
                /**
                 * copy bundles to streaming assets folder, which will be packaged into the exported player.
                 */
                copyToStreamingAssets?: boolean;
                /**
                 * array of patterns to match (C# Regular Expressions) when copying asset bundle files. By default, all bundles will be copied.
                 */
                copyBundlePatterns?: string[];
              };
              addressables?: {
                /**
                 * enable addressable builds for this target
                 */
                buildAddressables?: boolean;
                /**
                 * Update a previously built player with new Addressable Content.
                 */
                contentUpdate?: boolean;
                /**
                 * which addressables profile should be used for the build
                 */
                profileName?: string;
                /**
                 * Exit and mark the build as failed if an error occurs when addressables are built
                 */
                failedAddressablesFailsBuild?: boolean;
                contentUpdateSettings?: {
                  /**
                   * The path to a Content State .bin file relative to the project root
                   */
                  contentStatePath?: string;
                  /**
                   * The Id of the build target to obtain a Content State .bin file from
                   */
                  linkedTargetId?: string;
                };
              };
              /**
               * Run any unit tests your project has when a build happens.
               */
              runUnitTests?: boolean;
              /**
               * Should Edit Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runEditModeTests?: boolean;
              /**
               * Should Play Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runPlayModeTests?: boolean;
              /**
               * Mark builds as failed if the unit tests do not pass.
               */
              failedUnitTestFailsBuild?: boolean;
              /**
               * LEGACY - The Unity method to call when running unit tests (only supported in Unity 5.2 and lower).
               */
              unitTestMethod?: string;
              /**
               * Enable lightmap baking (disabled by default since it is very slow and usually unnecessary)
               */
              enableLightBake?: boolean;
            };
          };
        };
        credentials?: {
          signing?: {
            credentialid?: string;
          };
        };
      }
    }
    namespace Responses {
      export interface $201 {
        name?: string;
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        /**
         * whether this target can be built by the API
         */
        enabled?: boolean;
        settings?: {
          /**
           * start builds automatically when your repo is updated
           */
          autoBuild?: boolean;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * attempt to automatically detect which unity version to use, fallback to specified unityVersion if unable to.
           */
          autoDetectUnityVersion?: boolean;
          /**
           * attempt to get a similar unity patch version to use, applies to unavailable auto-detected Unity versions only.
           */
          fallbackPatchVersion?: boolean;
          executablename?: string;
          scm?: {
            type?: "git" | "svn" | "p4" | "hg" | "collab" | "oauth" | "plastic";
            /**
             * Which repo to use. Only applies to Plastic SCM, other SCM types configure repo on the project level.
             */
            repo?: string;
            branch?: string;
            /**
             * subdirectory to build from
             */
            subdirectory?: string;
            /**
             * perforce only client workspace to build from
             */
            client?: string;
          };
          platform?: {
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * 'latest' or a supported xcode version (ex. 'xcode7')
             */
            xcodeVersion?: string;
          };
          /**
           * For Scheduling builds
           */
          buildSchedule?: {
            isEnabled?: boolean;
            date?: string; // date-time
            repeatCycle?: "none" | "once" | "daily" | "weekly" | "monthly" | "yearly";
            cleanBuild?: boolean;
          };
          autoBuildCancellation?: boolean;
          gcpBetaOptIn?: boolean;
          gcpOptOut?: boolean;
          advanced?: {
            xcode?: {
              useArchiveAndExport?: boolean;
              /**
               * The path (including file name) from the project root to the custom FastLane configuration json file to configure multiple provisioning files, or customize the FastLane build process.
               * See https://forum.unity.com/threads/xcode-9-multiple-provisioning-profiles.545121/
               * Will look for Assets/ucb_xcode_fastlane.json by default, if not specified.
               */
              customFastlaneConfigPath?: string;
              /**
               * Only used with OSX targets, this triggers signing and notarization process for the executable.
               */
              shouldNotarize?: boolean;
            };
            android?: {
              buildAppBundle?: boolean;
              buildAssetPacks?: boolean;
            };
            unity?: {
              /**
               * The fully-qualified name of a public static method you want us to call before we start the Unity build process.
               * For example: ClassName.NeatMethod or NameSpace.ClassName.NeatMethod.
               * No trailing parenthesis, and it can't have the same name as your Post-Export method!
               */
              preExportMethod?: string;
              /**
               * The fully-qualified name of a public static method you want us to call after we finish the Unity build process
               * (but before Xcode). For example: ClassName.CoolMethod or NameSpace.ClassName.CoolMethod. No trailing parenthesis,
               * and it can't have the same name as your Post-Export method! This method must accept a string parameter, which
               * will receive the path to the exported Unity player (or Xcode project in the case of iOS).
               */
              postExportMethod?: string;
              /**
               * Relative path to the script that should be run before the build process starts.
               */
              preBuildScript?: string;
              /**
               * Relative path to the script that should be run after the build process finishes.
               */
              postBuildScript?: string;
              /**
               * If this is true, a non-zero exit code on your preBuildScript will cause your build to be marked as Failed
               */
              preBuildScriptFailsBuild?: boolean;
              /**
               * If this is true, a non-zero exit code on your postBuildScript will cause your build to be marked as Failed
               */
              postBuildScriptFailsBuild?: boolean;
              /**
               * Enter the names of the symbols you want to define for iOS. These symbols can then be used as the conditions
               * for #if directives just like the built-in ones. (i.e. #IF MYDEFINE or #IF AMAZON)
               */
              scriptingDefineSymbols?: string;
              playerExporter?: {
                /**
                 * A list of scenes to build overriding those specified in the Build Settings menu of your Unity project.
                 */
                sceneList?: string[];
                /**
                 * Unity Editor build options. Use BuildOptions.Development and BuildOptions.AllowDebugging to create a development build.
                 */
                buildOptions?: string[];
                /**
                 * Enable exporting a player from Unity (i.e. running BuildPipeline.BuildPlayer). Enabling this is equivalent to disabling
                 * Content-only Build in Build Target on Developer Dashboard. In general, this should be true, unless you are doing something
                 * something like an asset bundle only build or unit test only build without generating an actual build artifact.
                 */
                export?: boolean;
              };
              playerSettings?: {
                Android?: {
                  /**
                   * break up android apk into an installable apk and expansion files
                   */
                  useAPKExpansionFiles?: boolean;
                };
              };
              editorUserBuildSettings?: {
                /**
                 * which android build system to build with (android only, supported in Unity 5.5+)
                 */
                androidBuildSystem?: "internal" | "gradle";
              };
              assetBundles?: {
                /**
                 * enable asset bundle builds for this target
                 */
                buildBundles?: boolean;
                /**
                 * base path relative to Assets folder where asset bundles are output. Default is 'AssetBundles'
                 */
                basePath?: string;
                /**
                 * comma separated list of flags from BuildAssetBundleOptions. see https://docs.unity3d.com/ScriptReference/BuildAssetBundleOptions.html
                 */
                buildAssetBundleOptions?: string;
                /**
                 * copy bundles to streaming assets folder, which will be packaged into the exported player.
                 */
                copyToStreamingAssets?: boolean;
                /**
                 * array of patterns to match (C# Regular Expressions) when copying asset bundle files. By default, all bundles will be copied.
                 */
                copyBundlePatterns?: string[];
              };
              addressables?: {
                /**
                 * enable addressable builds for this target
                 */
                buildAddressables?: boolean;
                /**
                 * Update a previously built player with new Addressable Content.
                 */
                contentUpdate?: boolean;
                /**
                 * which addressables profile should be used for the build
                 */
                profileName?: string;
                /**
                 * Exit and mark the build as failed if an error occurs when addressables are built
                 */
                failedAddressablesFailsBuild?: boolean;
                contentUpdateSettings?: {
                  /**
                   * The path to a Content State .bin file relative to the project root
                   */
                  contentStatePath?: string;
                  /**
                   * The Id of the build target to obtain a Content State .bin file from
                   */
                  linkedTargetId?: string;
                };
              };
              /**
               * Run any unit tests your project has when a build happens.
               */
              runUnitTests?: boolean;
              /**
               * Should Edit Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runEditModeTests?: boolean;
              /**
               * Should Play Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runPlayModeTests?: boolean;
              /**
               * Mark builds as failed if the unit tests do not pass.
               */
              failedUnitTestFailsBuild?: boolean;
              /**
               * LEGACY - The Unity method to call when running unit tests (only supported in Unity 5.2 and lower).
               */
              unitTestMethod?: string;
              /**
               * Enable lightmap baking (disabled by default since it is very slow and usually unnecessary)
               */
              enableLightBake?: boolean;
            };
          };
        };
        lastBuilt?: {
          /**
           * Last Unity version built by this target. Setting this has no effect.
           */
          unityVersion?: string;
        };
        credentials?: {
          signing?: {
            credentialid?: string;
            credentialResourceRef?: {
              platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
              label?: string;
              credentialid?: string;
              created?: string;
              lastMod?: string;
              certificate?: {
                /**
                 * generated team id from Apple
                 */
                teamId?: string;
                /**
                 * certificate name (from the certificate)
                 */
                certName?: string;
                /**
                 * expiration date
                 */
                expiration?: string;
                /**
                 * if this is a distribution certificate
                 */
                isDistribution?: boolean;
                /**
                 * issuer of the certificate
                 */
                issuer?: string;
                /**
                 * uploaded date
                 */
                uploaded?: string;
              };
              provisioningProfile?: {
                /**
                 * generated team id from Apple
                 */
                teamId?: string;
                /**
                 * a unique identifier (com.example.name)
                 */
                bundleId?: string;
                /**
                 * generated UUID of the profile
                 */
                uuid?: string;
                /**
                 * expiration date
                 */
                expiration?: string;
                /**
                 * is this compiled for Apple's enterprise program
                 */
                isEnterpriseProfile?: boolean;
                type?: "developer" | "adhoc" | "appstore";
                /**
                 * number of devices provisioned for this certificate
                 */
                numDevices?: number;
                /**
                 * uploaded date
                 */
                uploaded?: string;
              };
              keystore?: {
                /**
                 * friendly name for keystore
                 */
                alias?: string;
                /**
                 * whether this is a debug or production keystore
                 */
                debug?: boolean;
                /**
                 * expiration date
                 */
                expiration?: string;
              };
              links?: {
              };
            };
          };
        };
        builds?: {
          build?: number;
          /**
           * unique id auto-generated from the build target name
           */
          buildtargetid?: string;
          buildTargetName?: string;
          /**
           * unique GUID identifying this build
           */
          buildGUID?: string;
          buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
          /**
           * if the build was built without using data cached from previous builds
           */
          cleanBuild?: boolean;
          /**
           * list of failure details for this build attempt, when available
           */
          failureDetails?: {
            label?: string;
            resolutionHint?: string;
            stages?: string[];
            failureType?: string;
            count?: number;
          }[];
          canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of workspace in bytes
           */
          workspaceSize?: number;
          /**
           * when the build was created
           */
          created?: string;
          /**
           * when the build completely finished
           */
          finished?: string;
          /**
           * when the build starting checking out code
           */
          checkoutStartTime?: string;
          /**
           * amount of time spent checking out code
           */
          checkoutTimeInSeconds?: number;
          /**
           * when the build started compiling
           */
          buildStartTime?: string;
          /**
           * amount of time spend compiling
           */
          buildTimeInSeconds?: number;
          /**
           * when the build started saving build artifacts
           */
          publishStartTime?: string;
          /**
           * amount of time spent saving build artifacts
           */
          publishTimeInSeconds?: number;
          /**
           * total time for the build
           */
          totalTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          unitTestTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          editModeTestTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          playModeTestTimeInSeconds?: number;
          /**
           * source control commit id for the build
           */
          lastBuiltRevision?: string;
          /**
           * a list of source control changes between this and the last build
           */
          changeset?: {
          }[];
          /**
           * if the build is marked as do not delete or not
           */
          favorited?: boolean;
          /**
           * description given when a build is favorited
           */
          label?: string;
          /**
           * if the build is deleted or not
           */
          deleted?: boolean;
          /**
           * if the build was built to run in linux headless mode
           */
          headless?: any;
          /**
           * if a newer credential has been attached to this buildtarget and the build can be re-signed
           */
          credentialsOutdated?: boolean;
          /**
           * email address of the user who deleted this attempt
           */
          deletedBy?: string;
          /**
           * reason the build is currently waiting
           */
          queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
          /**
           * time until this build will be reconsidered for building
           */
          cooldownDate?: string;
          /**
           * scm branch to be built
           */
          scmBranch?: string;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * 'latest' or a supported xcode version (ex. 'xcode7')
           */
          xcodeVersion?: string;
          auditChanges?: number;
          projectVersion?: {
            /**
             * automatically generated name for the build
             */
            name?: string;
            /**
             * filename for the primary artifact
             */
            filename?: string;
            /**
             * name of the project
             */
            projectName?: string;
            platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
            /**
             * size of the the primary build artifact in bytes
             */
            size?: number;
            /**
             * creation date
             */
            created?: string;
            /**
             * last modified date
             */
            lastMod?: string;
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * iPhone unique identifiers that are able to install this build
             */
            udids?: string[];
            /**
             * links to build artifacts
             */
            links?: {
            };
          };
          projectName?: string;
          projectId?: string;
          projectGuid?: string;
          orgId?: string;
          orgFk?: string;
          filetoken?: string;
          links?: {
            [name: string]: {
              href?: string;
              method?: string;
              meta?: {
              };
            };
          };
          buildReport?: {
            errors?: number;
            warnings?: number;
          };
          /**
           * results from the build's unit tests, if any
           */
          testResults?: {
            unit_test?: {
            };
            unit_test_editmode?: {
            };
            unit_test_playmode?: {
            };
          };
          error?: string;
        }[];
        links?: {
        };
      }
    }
  }
  namespace AddCredentialsAndroid {
    namespace Responses {
      export interface $201 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        keystore?: {
          /**
           * friendly name for keystore
           */
          alias?: string;
          /**
           * whether this is a debug or production keystore
           */
          debug?: boolean;
          expiration?: string;
        };
        links?: {
        };
      }
    }
  }
  namespace AddCredentialsAndroidForOrg {
    namespace Responses {
      export interface $201 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        keystore?: {
          /**
           * friendly name for keystore
           */
          alias?: string;
          /**
           * whether this is a debug or production keystore
           */
          debug?: boolean;
          expiration?: string;
        };
        links?: {
        };
      }
    }
  }
  namespace AddCredentialsIos {
    namespace Responses {
      export interface $201 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * certificate name (from the certificate)
           */
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * if this is a distribution certificate
           */
          isDistribution?: boolean;
          /**
           * issuer of the certificate
           */
          issuer?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        provisioningProfile?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * is this compiled for Apple's enterprise program
           */
          isEnterpriseProfile?: boolean;
          type?: "developer" | "adhoc" | "appstore";
          /**
           * number of devices provisioned for this certificate
           */
          numDevices?: number;
          /**
           * uploaded date
           */
          uploaded?: string;
          /**
           * provisoned udids
           */
          provisionedDevices?: string[];
        };
        links?: {
        };
      }
    }
  }
  namespace AddCredentialsIosForOrg {
    namespace Responses {
      export interface $201 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * certificate name (from the certificate)
           */
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * if this is a distribution certificate
           */
          isDistribution?: boolean;
          /**
           * issuer of the certificate
           */
          issuer?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        provisioningProfile?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * is this compiled for Apple's enterprise program
           */
          isEnterpriseProfile?: boolean;
          type?: "developer" | "adhoc" | "appstore";
          /**
           * number of devices provisioned for this certificate
           */
          numDevices?: number;
          /**
           * uploaded date
           */
          uploaded?: string;
          /**
           * provisoned udids
           */
          provisionedDevices?: string[];
        };
        links?: {
        };
      }
    }
  }
  namespace AddCredentialsOsx {
    namespace Responses {
      export interface $201 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        providerName?: string;
        appleIdUsername?: string;
        links?: {
        };
      }
    }
  }
  namespace AddCredentialsOsxForOrg {
    namespace Responses {
      export interface $201 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        providerName?: string;
        appleIdUsername?: string;
        links?: {
        };
      }
    }
  }
  namespace AddHookForOrg {
    export interface BodyParameters {
      options?: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
      }
    }
    namespace Responses {
      export interface $201 {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
        id?: string;
      }
    }
  }
  namespace AddHookForProject {
    export interface BodyParameters {
      options?: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
      }
    }
    namespace Responses {
      export interface $201 {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
        id?: string;
      }
    }
  }
  namespace AddProject {
    export interface BodyParameters {
      options: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        name?: string;
        disabled?: boolean;
        disableNotifications?: boolean;
        generateShareLinks?: boolean;
        settings?: {
          remoteCacheStrategy?: "none" | "library" | "workspace";
          scm?: {
          };
        };
      }
    }
    namespace Responses {
      export interface $201 {
        name?: string;
        projectid?: string;
        orgName?: string;
        orgid?: string;
        orgFk?: string;
        guid?: string;
        created?: string;
        cachedIcon?: string;
        serviceFlags?: {
        };
        links?: {
        };
        disabled?: boolean;
        disableNotifications?: boolean;
        generateShareLinks?: boolean;
        settings?: {
          remoteCacheStrategy?: "none" | "library" | "workspace";
          scm?: {
          };
        };
      }
    }
  }
  namespace ArchiveProject {
    namespace Responses {
      export type $204 = string;
      export interface $404 {
        error?: string;
        detail?: string[];
      }
    }
  }
  namespace BatchDeleteBuildArtifacts {
    export interface BodyParameters {
      options: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        builds: {
          buildtargetid: string;
          build: number;
        }[];
      }
    }
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace CancelAllBuilds {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace CancelBuild {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace CancelBuildsForOrg {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace CreateDevice {
    export interface BodyParameters {
      options: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        udid: string;
        devicename?: string;
        os?: string;
        osversion?: string;
        product?: string;
        status?: "disabled" | "active";
      }
    }
    namespace Responses {
      export interface $201 {
        udid: string;
        devicename?: string;
        os?: string;
        osversion?: string;
        product?: string;
        status?: "disabled" | "active";
      }
      export type $400 = string;
    }
  }
  namespace CreateShare {
    export interface BodyParameters {
      shareExpiry?: Parameters.ShareExpiry;
    }
    namespace Parameters {
      export interface ShareExpiry {
        shareExpiry?: string;
      }
    }
    namespace Responses {
      export interface $201 {
        shareid?: string;
        shareExpiry?: string;
      }
      export type $404 = string;
    }
  }
  namespace DeleteAllBuildArtifacts {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace DeleteAndroid {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace DeleteAndroidForOrg {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace DeleteBuildArtifacts {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace DeleteBuildTarget {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace DeleteHookForOrg {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace DeleteHookForProject {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace DeleteIos {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace DeleteIosForOrg {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace DeleteOsx {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace DeleteOsxForOrg {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace GetAllAndroid {
    namespace Responses {
      export type $200 = {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        keystore?: {
          /**
           * friendly name for keystore
           */
          alias?: string;
          /**
           * whether this is a debug or production keystore
           */
          debug?: boolean;
          expiration?: string;
        };
        links?: {
        };
      }[];
    }
  }
  namespace GetAllAndroidForOrg {
    namespace Responses {
      export type $200 = {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        keystore?: {
          /**
           * friendly name for keystore
           */
          alias?: string;
          /**
           * whether this is a debug or production keystore
           */
          debug?: boolean;
          expiration?: string;
        };
        links?: {
        };
      }[];
    }
  }
  namespace GetAllIos {
    namespace Responses {
      export type $200 = {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * certificate name (from the certificate)
           */
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * if this is a distribution certificate
           */
          isDistribution?: boolean;
          /**
           * issuer of the certificate
           */
          issuer?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        provisioningProfile?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * is this compiled for Apple's enterprise program
           */
          isEnterpriseProfile?: boolean;
          type?: "developer" | "adhoc" | "appstore";
          /**
           * number of devices provisioned for this certificate
           */
          numDevices?: number;
          /**
           * uploaded date
           */
          uploaded?: string;
          /**
           * provisoned udids
           */
          provisionedDevices?: string[];
        };
        links?: {
        };
      }[];
    }
  }
  namespace GetAllIosForOrg {
    namespace Responses {
      export type $200 = {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * certificate name (from the certificate)
           */
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * if this is a distribution certificate
           */
          isDistribution?: boolean;
          /**
           * issuer of the certificate
           */
          issuer?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        provisioningProfile?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * is this compiled for Apple's enterprise program
           */
          isEnterpriseProfile?: boolean;
          type?: "developer" | "adhoc" | "appstore";
          /**
           * number of devices provisioned for this certificate
           */
          numDevices?: number;
          /**
           * uploaded date
           */
          uploaded?: string;
          /**
           * provisoned udids
           */
          provisionedDevices?: string[];
        };
        links?: {
        };
      }[];
    }
  }
  namespace GetAllOsx {
    namespace Responses {
      export type $200 = {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        providerName?: string;
        appleIdUsername?: string;
        links?: {
        };
      }[];
    }
  }
  namespace GetAllOsxForOrg {
    namespace Responses {
      export type $200 = {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        providerName?: string;
        appleIdUsername?: string;
        links?: {
        };
      }[];
    }
  }
  namespace GetAuditLog {
    namespace Responses {
      export type $200 = {
        updatingUserEmail?: string;
        updated: string; // dateTime
        lines: {
          label?: string;
          field: string;
          to: string;
          from?: string;
        }[];
      }[];
    }
  }
  namespace GetAuditLogForBuildTarget {
    namespace Responses {
      export type $200 = {
        updatingUserEmail?: string;
        updated: string; // dateTime
        lines: {
          label?: string;
          field: string;
          to: string;
          from?: string;
        }[];
      }[];
    }
  }
  namespace GetAuditLogForProject {
    namespace Responses {
      export type $200 = {
        updatingUserEmail?: string;
        updated: string; // dateTime
        lines: {
          label?: string;
          field: string;
          to: string;
          from?: string;
        }[];
      }[];
    }
  }
  namespace GetBillingPlans {
    namespace Responses {
      export interface $200 {
        /**
         * actual billing plan
         */
        billing: {
          label?: string;
          numProjects?: number;
          concurrentBuilds?: number;
          concurrentBuildsGCP?: number;
          cooldownMinutes?: number;
          cooldownGracePeriodMinutes?: number;
          collaborators?: number;
          repoSizeLimitMB?: number;
          repoSizeLimitThresholdMB?: number;
          downloadLimitMB?: number;
          buildManifest?: boolean;
          libraryCaching?: boolean;
          pushExternalServices?: boolean;
          supportTickets?: boolean;
          apiAccess?: boolean;
          scheduledBuilds?: boolean;
          workspaceCaching?: boolean;
          buildingDisabled?: boolean;
          advancedFeatures?: string[];
          scmTypes?: string[];
        };
        /**
         * effective billing plan, this includes temporary overrides and specials
         */
        effective: {
          label?: string;
          numProjects?: number;
          concurrentBuilds?: number;
          concurrentBuildsGCP?: number;
          cooldownMinutes?: number;
          cooldownGracePeriodMinutes?: number;
          collaborators?: number;
          repoSizeLimitMB?: number;
          repoSizeLimitThresholdMB?: number;
          downloadLimitMB?: number;
          buildManifest?: boolean;
          libraryCaching?: boolean;
          pushExternalServices?: boolean;
          supportTickets?: boolean;
          apiAccess?: boolean;
          scheduledBuilds?: boolean;
          workspaceCaching?: boolean;
          buildingDisabled?: boolean;
          advancedFeatures?: string[];
          scmTypes?: string[];
        };
      }
    }
  }
  namespace GetBillingPlansForProject {
    namespace Responses {
      export interface $200 {
        /**
         * actual billing plan
         */
        billing: {
          label?: string;
          numProjects?: number;
          concurrentBuilds?: number;
          concurrentBuildsGCP?: number;
          cooldownMinutes?: number;
          cooldownGracePeriodMinutes?: number;
          collaborators?: number;
          repoSizeLimitMB?: number;
          repoSizeLimitThresholdMB?: number;
          downloadLimitMB?: number;
          buildManifest?: boolean;
          libraryCaching?: boolean;
          pushExternalServices?: boolean;
          supportTickets?: boolean;
          apiAccess?: boolean;
          scheduledBuilds?: boolean;
          workspaceCaching?: boolean;
          buildingDisabled?: boolean;
          advancedFeatures?: string[];
          scmTypes?: string[];
        };
        /**
         * effective billing plan, this includes temporary overrides and specials
         */
        effective: {
          label?: string;
          numProjects?: number;
          concurrentBuilds?: number;
          concurrentBuildsGCP?: number;
          cooldownMinutes?: number;
          cooldownGracePeriodMinutes?: number;
          collaborators?: number;
          repoSizeLimitMB?: number;
          repoSizeLimitThresholdMB?: number;
          downloadLimitMB?: number;
          buildManifest?: boolean;
          libraryCaching?: boolean;
          pushExternalServices?: boolean;
          supportTickets?: boolean;
          apiAccess?: boolean;
          scheduledBuilds?: boolean;
          workspaceCaching?: boolean;
          buildingDisabled?: boolean;
          advancedFeatures?: string[];
          scmTypes?: string[];
        };
      }
    }
  }
  namespace GetBuild {
    namespace Responses {
      /**
       * buildattempt
       */
      export interface $200 {
        build?: number;
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        buildTargetName?: string;
        /**
         * unique GUID identifying this build
         */
        buildGUID?: string;
        buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
        /**
         * if the build was built without using data cached from previous builds
         */
        cleanBuild?: boolean;
        /**
         * list of failure details for this build attempt, when available
         */
        failureDetails?: {
          label?: string;
          resolutionHint?: string;
          stages?: string[];
          failureType?: string;
          count?: number;
        }[];
        canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * size of workspace in bytes
         */
        workspaceSize?: number;
        /**
         * when the build was created
         */
        created?: string;
        /**
         * when the build completely finished
         */
        finished?: string;
        /**
         * when the build starting checking out code
         */
        checkoutStartTime?: string;
        /**
         * amount of time spent checking out code
         */
        checkoutTimeInSeconds?: number;
        /**
         * when the build started compiling
         */
        buildStartTime?: string;
        /**
         * amount of time spend compiling
         */
        buildTimeInSeconds?: number;
        /**
         * when the build started saving build artifacts
         */
        publishStartTime?: string;
        /**
         * amount of time spent saving build artifacts
         */
        publishTimeInSeconds?: number;
        /**
         * total time for the build
         */
        totalTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        unitTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        editModeTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        playModeTestTimeInSeconds?: number;
        /**
         * source control commit id for the build
         */
        lastBuiltRevision?: string;
        /**
         * a list of source control changes between this and the last build
         */
        changeset?: {
        }[];
        /**
         * if the build is marked as do not delete or not
         */
        favorited?: boolean;
        /**
         * description given when a build is favorited
         */
        label?: string;
        /**
         * if the build is deleted or not
         */
        deleted?: boolean;
        /**
         * if the build was built to run in linux headless mode
         */
        headless?: any;
        /**
         * if a newer credential has been attached to this buildtarget and the build can be re-signed
         */
        credentialsOutdated?: boolean;
        /**
         * email address of the user who deleted this attempt
         */
        deletedBy?: string;
        /**
         * reason the build is currently waiting
         */
        queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
        /**
         * time until this build will be reconsidered for building
         */
        cooldownDate?: string;
        /**
         * scm branch to be built
         */
        scmBranch?: string;
        /**
         * 'latest' or a unity dot version with underscores (ex. '4_6_5')
         */
        unityVersion?: string;
        /**
         * 'latest' or a supported xcode version (ex. 'xcode7')
         */
        xcodeVersion?: string;
        auditChanges?: number;
        projectVersion?: {
          /**
           * automatically generated name for the build
           */
          name?: string;
          /**
           * filename for the primary artifact
           */
          filename?: string;
          /**
           * name of the project
           */
          projectName?: string;
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of the the primary build artifact in bytes
           */
          size?: number;
          /**
           * creation date
           */
          created?: string;
          /**
           * last modified date
           */
          lastMod?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * iPhone unique identifiers that are able to install this build
           */
          udids?: string[];
          /**
           * links to build artifacts
           */
          links?: {
          };
        };
        projectName?: string;
        projectId?: string;
        projectGuid?: string;
        orgId?: string;
        orgFk?: string;
        filetoken?: string;
        links?: {
          [name: string]: {
            href?: string;
            method?: string;
            meta?: {
            };
          };
        };
        buildReport?: {
          errors?: number;
          warnings?: number;
        };
        /**
         * results from the build's unit tests, if any
         */
        testResults?: {
          unit_test?: {
          };
          unit_test_editmode?: {
          };
          unit_test_playmode?: {
          };
        };
        error?: string;
      }
    }
  }
  namespace GetBuildLog {
    namespace Responses {
      export interface Default {
        error?: string;
        detail?: string[];
      }
    }
  }
  namespace GetBuildSteps {
    namespace Responses {
      export type $200 = {
        depth?: number;
        duration: number;
        name: string;
        messages?: {
          content?: string;
          typeCode?: number;
        }[];
      }[];
    }
  }
  namespace GetBuildTarget {
    namespace Responses {
      export interface $200 {
        name?: string;
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        /**
         * whether this target can be built by the API
         */
        enabled?: boolean;
        settings?: {
          /**
           * start builds automatically when your repo is updated
           */
          autoBuild?: boolean;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * attempt to automatically detect which unity version to use, fallback to specified unityVersion if unable to.
           */
          autoDetectUnityVersion?: boolean;
          /**
           * attempt to get a similar unity patch version to use, applies to unavailable auto-detected Unity versions only.
           */
          fallbackPatchVersion?: boolean;
          executablename?: string;
          scm?: {
            type?: "git" | "svn" | "p4" | "hg" | "collab" | "oauth" | "plastic";
            /**
             * Which repo to use. Only applies to Plastic SCM, other SCM types configure repo on the project level.
             */
            repo?: string;
            branch?: string;
            /**
             * subdirectory to build from
             */
            subdirectory?: string;
            /**
             * perforce only client workspace to build from
             */
            client?: string;
          };
          platform?: {
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * 'latest' or a supported xcode version (ex. 'xcode7')
             */
            xcodeVersion?: string;
          };
          /**
           * For Scheduling builds
           */
          buildSchedule?: {
            isEnabled?: boolean;
            date?: string; // date-time
            repeatCycle?: "none" | "once" | "daily" | "weekly" | "monthly" | "yearly";
            cleanBuild?: boolean;
          };
          autoBuildCancellation?: boolean;
          gcpBetaOptIn?: boolean;
          gcpOptOut?: boolean;
          advanced?: {
            xcode?: {
              useArchiveAndExport?: boolean;
              /**
               * The path (including file name) from the project root to the custom FastLane configuration json file to configure multiple provisioning files, or customize the FastLane build process.
               * See https://forum.unity.com/threads/xcode-9-multiple-provisioning-profiles.545121/
               * Will look for Assets/ucb_xcode_fastlane.json by default, if not specified.
               */
              customFastlaneConfigPath?: string;
              /**
               * Only used with OSX targets, this triggers signing and notarization process for the executable.
               */
              shouldNotarize?: boolean;
            };
            android?: {
              buildAppBundle?: boolean;
              buildAssetPacks?: boolean;
            };
            unity?: {
              /**
               * The fully-qualified name of a public static method you want us to call before we start the Unity build process.
               * For example: ClassName.NeatMethod or NameSpace.ClassName.NeatMethod.
               * No trailing parenthesis, and it can't have the same name as your Post-Export method!
               */
              preExportMethod?: string;
              /**
               * The fully-qualified name of a public static method you want us to call after we finish the Unity build process
               * (but before Xcode). For example: ClassName.CoolMethod or NameSpace.ClassName.CoolMethod. No trailing parenthesis,
               * and it can't have the same name as your Post-Export method! This method must accept a string parameter, which
               * will receive the path to the exported Unity player (or Xcode project in the case of iOS).
               */
              postExportMethod?: string;
              /**
               * Relative path to the script that should be run before the build process starts.
               */
              preBuildScript?: string;
              /**
               * Relative path to the script that should be run after the build process finishes.
               */
              postBuildScript?: string;
              /**
               * If this is true, a non-zero exit code on your preBuildScript will cause your build to be marked as Failed
               */
              preBuildScriptFailsBuild?: boolean;
              /**
               * If this is true, a non-zero exit code on your postBuildScript will cause your build to be marked as Failed
               */
              postBuildScriptFailsBuild?: boolean;
              /**
               * Enter the names of the symbols you want to define for iOS. These symbols can then be used as the conditions
               * for #if directives just like the built-in ones. (i.e. #IF MYDEFINE or #IF AMAZON)
               */
              scriptingDefineSymbols?: string;
              playerExporter?: {
                /**
                 * A list of scenes to build overriding those specified in the Build Settings menu of your Unity project.
                 */
                sceneList?: string[];
                /**
                 * Unity Editor build options. Use BuildOptions.Development and BuildOptions.AllowDebugging to create a development build.
                 */
                buildOptions?: string[];
                /**
                 * Enable exporting a player from Unity (i.e. running BuildPipeline.BuildPlayer). Enabling this is equivalent to disabling
                 * Content-only Build in Build Target on Developer Dashboard. In general, this should be true, unless you are doing something
                 * something like an asset bundle only build or unit test only build without generating an actual build artifact.
                 */
                export?: boolean;
              };
              playerSettings?: {
                Android?: {
                  /**
                   * break up android apk into an installable apk and expansion files
                   */
                  useAPKExpansionFiles?: boolean;
                };
              };
              editorUserBuildSettings?: {
                /**
                 * which android build system to build with (android only, supported in Unity 5.5+)
                 */
                androidBuildSystem?: "internal" | "gradle";
              };
              assetBundles?: {
                /**
                 * enable asset bundle builds for this target
                 */
                buildBundles?: boolean;
                /**
                 * base path relative to Assets folder where asset bundles are output. Default is 'AssetBundles'
                 */
                basePath?: string;
                /**
                 * comma separated list of flags from BuildAssetBundleOptions. see https://docs.unity3d.com/ScriptReference/BuildAssetBundleOptions.html
                 */
                buildAssetBundleOptions?: string;
                /**
                 * copy bundles to streaming assets folder, which will be packaged into the exported player.
                 */
                copyToStreamingAssets?: boolean;
                /**
                 * array of patterns to match (C# Regular Expressions) when copying asset bundle files. By default, all bundles will be copied.
                 */
                copyBundlePatterns?: string[];
              };
              addressables?: {
                /**
                 * enable addressable builds for this target
                 */
                buildAddressables?: boolean;
                /**
                 * Update a previously built player with new Addressable Content.
                 */
                contentUpdate?: boolean;
                /**
                 * which addressables profile should be used for the build
                 */
                profileName?: string;
                /**
                 * Exit and mark the build as failed if an error occurs when addressables are built
                 */
                failedAddressablesFailsBuild?: boolean;
                contentUpdateSettings?: {
                  /**
                   * The path to a Content State .bin file relative to the project root
                   */
                  contentStatePath?: string;
                  /**
                   * The Id of the build target to obtain a Content State .bin file from
                   */
                  linkedTargetId?: string;
                };
              };
              /**
               * Run any unit tests your project has when a build happens.
               */
              runUnitTests?: boolean;
              /**
               * Should Edit Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runEditModeTests?: boolean;
              /**
               * Should Play Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runPlayModeTests?: boolean;
              /**
               * Mark builds as failed if the unit tests do not pass.
               */
              failedUnitTestFailsBuild?: boolean;
              /**
               * LEGACY - The Unity method to call when running unit tests (only supported in Unity 5.2 and lower).
               */
              unitTestMethod?: string;
              /**
               * Enable lightmap baking (disabled by default since it is very slow and usually unnecessary)
               */
              enableLightBake?: boolean;
            };
          };
        };
        lastBuilt?: {
          /**
           * Last Unity version built by this target. Setting this has no effect.
           */
          unityVersion?: string;
        };
        credentials?: {
          signing?: {
            credentialid?: string;
            credentialResourceRef?: {
              platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
              label?: string;
              credentialid?: string;
              created?: string;
              lastMod?: string;
              certificate?: {
                /**
                 * generated team id from Apple
                 */
                teamId?: string;
                /**
                 * certificate name (from the certificate)
                 */
                certName?: string;
                /**
                 * expiration date
                 */
                expiration?: string;
                /**
                 * if this is a distribution certificate
                 */
                isDistribution?: boolean;
                /**
                 * issuer of the certificate
                 */
                issuer?: string;
                /**
                 * uploaded date
                 */
                uploaded?: string;
              };
              provisioningProfile?: {
                /**
                 * generated team id from Apple
                 */
                teamId?: string;
                /**
                 * a unique identifier (com.example.name)
                 */
                bundleId?: string;
                /**
                 * generated UUID of the profile
                 */
                uuid?: string;
                /**
                 * expiration date
                 */
                expiration?: string;
                /**
                 * is this compiled for Apple's enterprise program
                 */
                isEnterpriseProfile?: boolean;
                type?: "developer" | "adhoc" | "appstore";
                /**
                 * number of devices provisioned for this certificate
                 */
                numDevices?: number;
                /**
                 * uploaded date
                 */
                uploaded?: string;
              };
              keystore?: {
                /**
                 * friendly name for keystore
                 */
                alias?: string;
                /**
                 * whether this is a debug or production keystore
                 */
                debug?: boolean;
                /**
                 * expiration date
                 */
                expiration?: string;
              };
              links?: {
              };
            };
          };
        };
        builds?: {
          build?: number;
          /**
           * unique id auto-generated from the build target name
           */
          buildtargetid?: string;
          buildTargetName?: string;
          /**
           * unique GUID identifying this build
           */
          buildGUID?: string;
          buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
          /**
           * if the build was built without using data cached from previous builds
           */
          cleanBuild?: boolean;
          /**
           * list of failure details for this build attempt, when available
           */
          failureDetails?: {
            label?: string;
            resolutionHint?: string;
            stages?: string[];
            failureType?: string;
            count?: number;
          }[];
          canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of workspace in bytes
           */
          workspaceSize?: number;
          /**
           * when the build was created
           */
          created?: string;
          /**
           * when the build completely finished
           */
          finished?: string;
          /**
           * when the build starting checking out code
           */
          checkoutStartTime?: string;
          /**
           * amount of time spent checking out code
           */
          checkoutTimeInSeconds?: number;
          /**
           * when the build started compiling
           */
          buildStartTime?: string;
          /**
           * amount of time spend compiling
           */
          buildTimeInSeconds?: number;
          /**
           * when the build started saving build artifacts
           */
          publishStartTime?: string;
          /**
           * amount of time spent saving build artifacts
           */
          publishTimeInSeconds?: number;
          /**
           * total time for the build
           */
          totalTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          unitTestTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          editModeTestTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          playModeTestTimeInSeconds?: number;
          /**
           * source control commit id for the build
           */
          lastBuiltRevision?: string;
          /**
           * a list of source control changes between this and the last build
           */
          changeset?: {
          }[];
          /**
           * if the build is marked as do not delete or not
           */
          favorited?: boolean;
          /**
           * description given when a build is favorited
           */
          label?: string;
          /**
           * if the build is deleted or not
           */
          deleted?: boolean;
          /**
           * if the build was built to run in linux headless mode
           */
          headless?: any;
          /**
           * if a newer credential has been attached to this buildtarget and the build can be re-signed
           */
          credentialsOutdated?: boolean;
          /**
           * email address of the user who deleted this attempt
           */
          deletedBy?: string;
          /**
           * reason the build is currently waiting
           */
          queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
          /**
           * time until this build will be reconsidered for building
           */
          cooldownDate?: string;
          /**
           * scm branch to be built
           */
          scmBranch?: string;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * 'latest' or a supported xcode version (ex. 'xcode7')
           */
          xcodeVersion?: string;
          auditChanges?: number;
          projectVersion?: {
            /**
             * automatically generated name for the build
             */
            name?: string;
            /**
             * filename for the primary artifact
             */
            filename?: string;
            /**
             * name of the project
             */
            projectName?: string;
            platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
            /**
             * size of the the primary build artifact in bytes
             */
            size?: number;
            /**
             * creation date
             */
            created?: string;
            /**
             * last modified date
             */
            lastMod?: string;
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * iPhone unique identifiers that are able to install this build
             */
            udids?: string[];
            /**
             * links to build artifacts
             */
            links?: {
            };
          };
          projectName?: string;
          projectId?: string;
          projectGuid?: string;
          orgId?: string;
          orgFk?: string;
          filetoken?: string;
          links?: {
            [name: string]: {
              href?: string;
              method?: string;
              meta?: {
              };
            };
          };
          buildReport?: {
            errors?: number;
            warnings?: number;
          };
          /**
           * results from the build's unit tests, if any
           */
          testResults?: {
            unit_test?: {
            };
            unit_test_editmode?: {
            };
            unit_test_playmode?: {
            };
          };
          error?: string;
        }[];
        links?: {
        };
      }
    }
  }
  namespace GetBuildTargets {
    namespace Responses {
      export type $200 = {
        name?: string;
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        /**
         * whether this target can be built by the API
         */
        enabled?: boolean;
        settings?: {
          /**
           * start builds automatically when your repo is updated
           */
          autoBuild?: boolean;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * attempt to automatically detect which unity version to use, fallback to specified unityVersion if unable to.
           */
          autoDetectUnityVersion?: boolean;
          /**
           * attempt to get a similar unity patch version to use, applies to unavailable auto-detected Unity versions only.
           */
          fallbackPatchVersion?: boolean;
          executablename?: string;
          scm?: {
            type?: "git" | "svn" | "p4" | "hg" | "collab" | "oauth" | "plastic";
            /**
             * Which repo to use. Only applies to Plastic SCM, other SCM types configure repo on the project level.
             */
            repo?: string;
            branch?: string;
            /**
             * subdirectory to build from
             */
            subdirectory?: string;
            /**
             * perforce only client workspace to build from
             */
            client?: string;
          };
          platform?: {
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * 'latest' or a supported xcode version (ex. 'xcode7')
             */
            xcodeVersion?: string;
          };
          /**
           * For Scheduling builds
           */
          buildSchedule?: {
            isEnabled?: boolean;
            date?: string; // date-time
            repeatCycle?: "none" | "once" | "daily" | "weekly" | "monthly" | "yearly";
            cleanBuild?: boolean;
          };
          autoBuildCancellation?: boolean;
          gcpBetaOptIn?: boolean;
          gcpOptOut?: boolean;
          advanced?: {
            xcode?: {
              useArchiveAndExport?: boolean;
              /**
               * The path (including file name) from the project root to the custom FastLane configuration json file to configure multiple provisioning files, or customize the FastLane build process.
               * See https://forum.unity.com/threads/xcode-9-multiple-provisioning-profiles.545121/
               * Will look for Assets/ucb_xcode_fastlane.json by default, if not specified.
               */
              customFastlaneConfigPath?: string;
              /**
               * Only used with OSX targets, this triggers signing and notarization process for the executable.
               */
              shouldNotarize?: boolean;
            };
            android?: {
              buildAppBundle?: boolean;
              buildAssetPacks?: boolean;
            };
            unity?: {
              /**
               * The fully-qualified name of a public static method you want us to call before we start the Unity build process.
               * For example: ClassName.NeatMethod or NameSpace.ClassName.NeatMethod.
               * No trailing parenthesis, and it can't have the same name as your Post-Export method!
               */
              preExportMethod?: string;
              /**
               * The fully-qualified name of a public static method you want us to call after we finish the Unity build process
               * (but before Xcode). For example: ClassName.CoolMethod or NameSpace.ClassName.CoolMethod. No trailing parenthesis,
               * and it can't have the same name as your Post-Export method! This method must accept a string parameter, which
               * will receive the path to the exported Unity player (or Xcode project in the case of iOS).
               */
              postExportMethod?: string;
              /**
               * Relative path to the script that should be run before the build process starts.
               */
              preBuildScript?: string;
              /**
               * Relative path to the script that should be run after the build process finishes.
               */
              postBuildScript?: string;
              /**
               * If this is true, a non-zero exit code on your preBuildScript will cause your build to be marked as Failed
               */
              preBuildScriptFailsBuild?: boolean;
              /**
               * If this is true, a non-zero exit code on your postBuildScript will cause your build to be marked as Failed
               */
              postBuildScriptFailsBuild?: boolean;
              /**
               * Enter the names of the symbols you want to define for iOS. These symbols can then be used as the conditions
               * for #if directives just like the built-in ones. (i.e. #IF MYDEFINE or #IF AMAZON)
               */
              scriptingDefineSymbols?: string;
              playerExporter?: {
                /**
                 * A list of scenes to build overriding those specified in the Build Settings menu of your Unity project.
                 */
                sceneList?: string[];
                /**
                 * Unity Editor build options. Use BuildOptions.Development and BuildOptions.AllowDebugging to create a development build.
                 */
                buildOptions?: string[];
                /**
                 * Enable exporting a player from Unity (i.e. running BuildPipeline.BuildPlayer). Enabling this is equivalent to disabling
                 * Content-only Build in Build Target on Developer Dashboard. In general, this should be true, unless you are doing something
                 * something like an asset bundle only build or unit test only build without generating an actual build artifact.
                 */
                export?: boolean;
              };
              playerSettings?: {
                Android?: {
                  /**
                   * break up android apk into an installable apk and expansion files
                   */
                  useAPKExpansionFiles?: boolean;
                };
              };
              editorUserBuildSettings?: {
                /**
                 * which android build system to build with (android only, supported in Unity 5.5+)
                 */
                androidBuildSystem?: "internal" | "gradle";
              };
              assetBundles?: {
                /**
                 * enable asset bundle builds for this target
                 */
                buildBundles?: boolean;
                /**
                 * base path relative to Assets folder where asset bundles are output. Default is 'AssetBundles'
                 */
                basePath?: string;
                /**
                 * comma separated list of flags from BuildAssetBundleOptions. see https://docs.unity3d.com/ScriptReference/BuildAssetBundleOptions.html
                 */
                buildAssetBundleOptions?: string;
                /**
                 * copy bundles to streaming assets folder, which will be packaged into the exported player.
                 */
                copyToStreamingAssets?: boolean;
                /**
                 * array of patterns to match (C# Regular Expressions) when copying asset bundle files. By default, all bundles will be copied.
                 */
                copyBundlePatterns?: string[];
              };
              addressables?: {
                /**
                 * enable addressable builds for this target
                 */
                buildAddressables?: boolean;
                /**
                 * Update a previously built player with new Addressable Content.
                 */
                contentUpdate?: boolean;
                /**
                 * which addressables profile should be used for the build
                 */
                profileName?: string;
                /**
                 * Exit and mark the build as failed if an error occurs when addressables are built
                 */
                failedAddressablesFailsBuild?: boolean;
                contentUpdateSettings?: {
                  /**
                   * The path to a Content State .bin file relative to the project root
                   */
                  contentStatePath?: string;
                  /**
                   * The Id of the build target to obtain a Content State .bin file from
                   */
                  linkedTargetId?: string;
                };
              };
              /**
               * Run any unit tests your project has when a build happens.
               */
              runUnitTests?: boolean;
              /**
               * Should Edit Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runEditModeTests?: boolean;
              /**
               * Should Play Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runPlayModeTests?: boolean;
              /**
               * Mark builds as failed if the unit tests do not pass.
               */
              failedUnitTestFailsBuild?: boolean;
              /**
               * LEGACY - The Unity method to call when running unit tests (only supported in Unity 5.2 and lower).
               */
              unitTestMethod?: string;
              /**
               * Enable lightmap baking (disabled by default since it is very slow and usually unnecessary)
               */
              enableLightBake?: boolean;
            };
          };
        };
        lastBuilt?: {
          /**
           * Last Unity version built by this target. Setting this has no effect.
           */
          unityVersion?: string;
        };
        credentials?: {
          signing?: {
            credentialid?: string;
            credentialResourceRef?: {
              platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
              label?: string;
              credentialid?: string;
              created?: string;
              lastMod?: string;
              certificate?: {
                /**
                 * generated team id from Apple
                 */
                teamId?: string;
                /**
                 * certificate name (from the certificate)
                 */
                certName?: string;
                /**
                 * expiration date
                 */
                expiration?: string;
                /**
                 * if this is a distribution certificate
                 */
                isDistribution?: boolean;
                /**
                 * issuer of the certificate
                 */
                issuer?: string;
                /**
                 * uploaded date
                 */
                uploaded?: string;
              };
              provisioningProfile?: {
                /**
                 * generated team id from Apple
                 */
                teamId?: string;
                /**
                 * a unique identifier (com.example.name)
                 */
                bundleId?: string;
                /**
                 * generated UUID of the profile
                 */
                uuid?: string;
                /**
                 * expiration date
                 */
                expiration?: string;
                /**
                 * is this compiled for Apple's enterprise program
                 */
                isEnterpriseProfile?: boolean;
                type?: "developer" | "adhoc" | "appstore";
                /**
                 * number of devices provisioned for this certificate
                 */
                numDevices?: number;
                /**
                 * uploaded date
                 */
                uploaded?: string;
              };
              keystore?: {
                /**
                 * friendly name for keystore
                 */
                alias?: string;
                /**
                 * whether this is a debug or production keystore
                 */
                debug?: boolean;
                /**
                 * expiration date
                 */
                expiration?: string;
              };
              links?: {
              };
            };
          };
        };
        builds?: {
          build?: number;
          /**
           * unique id auto-generated from the build target name
           */
          buildtargetid?: string;
          buildTargetName?: string;
          /**
           * unique GUID identifying this build
           */
          buildGUID?: string;
          buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
          /**
           * if the build was built without using data cached from previous builds
           */
          cleanBuild?: boolean;
          /**
           * list of failure details for this build attempt, when available
           */
          failureDetails?: {
            label?: string;
            resolutionHint?: string;
            stages?: string[];
            failureType?: string;
            count?: number;
          }[];
          canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of workspace in bytes
           */
          workspaceSize?: number;
          /**
           * when the build was created
           */
          created?: string;
          /**
           * when the build completely finished
           */
          finished?: string;
          /**
           * when the build starting checking out code
           */
          checkoutStartTime?: string;
          /**
           * amount of time spent checking out code
           */
          checkoutTimeInSeconds?: number;
          /**
           * when the build started compiling
           */
          buildStartTime?: string;
          /**
           * amount of time spend compiling
           */
          buildTimeInSeconds?: number;
          /**
           * when the build started saving build artifacts
           */
          publishStartTime?: string;
          /**
           * amount of time spent saving build artifacts
           */
          publishTimeInSeconds?: number;
          /**
           * total time for the build
           */
          totalTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          unitTestTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          editModeTestTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          playModeTestTimeInSeconds?: number;
          /**
           * source control commit id for the build
           */
          lastBuiltRevision?: string;
          /**
           * a list of source control changes between this and the last build
           */
          changeset?: {
          }[];
          /**
           * if the build is marked as do not delete or not
           */
          favorited?: boolean;
          /**
           * description given when a build is favorited
           */
          label?: string;
          /**
           * if the build is deleted or not
           */
          deleted?: boolean;
          /**
           * if the build was built to run in linux headless mode
           */
          headless?: any;
          /**
           * if a newer credential has been attached to this buildtarget and the build can be re-signed
           */
          credentialsOutdated?: boolean;
          /**
           * email address of the user who deleted this attempt
           */
          deletedBy?: string;
          /**
           * reason the build is currently waiting
           */
          queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
          /**
           * time until this build will be reconsidered for building
           */
          cooldownDate?: string;
          /**
           * scm branch to be built
           */
          scmBranch?: string;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * 'latest' or a supported xcode version (ex. 'xcode7')
           */
          xcodeVersion?: string;
          auditChanges?: number;
          projectVersion?: {
            /**
             * automatically generated name for the build
             */
            name?: string;
            /**
             * filename for the primary artifact
             */
            filename?: string;
            /**
             * name of the project
             */
            projectName?: string;
            platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
            /**
             * size of the the primary build artifact in bytes
             */
            size?: number;
            /**
             * creation date
             */
            created?: string;
            /**
             * last modified date
             */
            lastMod?: string;
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * iPhone unique identifiers that are able to install this build
             */
            udids?: string[];
            /**
             * links to build artifacts
             */
            links?: {
            };
          };
          projectName?: string;
          projectId?: string;
          projectGuid?: string;
          orgId?: string;
          orgFk?: string;
          filetoken?: string;
          links?: {
            [name: string]: {
              href?: string;
              method?: string;
              meta?: {
              };
            };
          };
          buildReport?: {
            errors?: number;
            warnings?: number;
          };
          /**
           * results from the build's unit tests, if any
           */
          testResults?: {
            unit_test?: {
            };
            unit_test_editmode?: {
            };
            unit_test_playmode?: {
            };
          };
          error?: string;
        }[];
        links?: {
        };
      }[];
    }
  }
  namespace GetBuildTargetsForOrg {
    namespace Responses {
      export type $200 = {
        name?: string;
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        /**
         * whether this target can be built by the API
         */
        enabled?: boolean;
        settings?: {
          /**
           * start builds automatically when your repo is updated
           */
          autoBuild?: boolean;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * attempt to automatically detect which unity version to use, fallback to specified unityVersion if unable to.
           */
          autoDetectUnityVersion?: boolean;
          /**
           * attempt to get a similar unity patch version to use, applies to unavailable auto-detected Unity versions only.
           */
          fallbackPatchVersion?: boolean;
          executablename?: string;
          scm?: {
            type?: "git" | "svn" | "p4" | "hg" | "collab" | "oauth" | "plastic";
            /**
             * Which repo to use. Only applies to Plastic SCM, other SCM types configure repo on the project level.
             */
            repo?: string;
            branch?: string;
            /**
             * subdirectory to build from
             */
            subdirectory?: string;
            /**
             * perforce only client workspace to build from
             */
            client?: string;
          };
          platform?: {
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * 'latest' or a supported xcode version (ex. 'xcode7')
             */
            xcodeVersion?: string;
          };
          /**
           * For Scheduling builds
           */
          buildSchedule?: {
            isEnabled?: boolean;
            date?: string; // date-time
            repeatCycle?: "none" | "once" | "daily" | "weekly" | "monthly" | "yearly";
            cleanBuild?: boolean;
          };
          autoBuildCancellation?: boolean;
          gcpBetaOptIn?: boolean;
          gcpOptOut?: boolean;
          advanced?: {
            xcode?: {
              useArchiveAndExport?: boolean;
              /**
               * The path (including file name) from the project root to the custom FastLane configuration json file to configure multiple provisioning files, or customize the FastLane build process.
               * See https://forum.unity.com/threads/xcode-9-multiple-provisioning-profiles.545121/
               * Will look for Assets/ucb_xcode_fastlane.json by default, if not specified.
               */
              customFastlaneConfigPath?: string;
              /**
               * Only used with OSX targets, this triggers signing and notarization process for the executable.
               */
              shouldNotarize?: boolean;
            };
            android?: {
              buildAppBundle?: boolean;
              buildAssetPacks?: boolean;
            };
            unity?: {
              /**
               * The fully-qualified name of a public static method you want us to call before we start the Unity build process.
               * For example: ClassName.NeatMethod or NameSpace.ClassName.NeatMethod.
               * No trailing parenthesis, and it can't have the same name as your Post-Export method!
               */
              preExportMethod?: string;
              /**
               * The fully-qualified name of a public static method you want us to call after we finish the Unity build process
               * (but before Xcode). For example: ClassName.CoolMethod or NameSpace.ClassName.CoolMethod. No trailing parenthesis,
               * and it can't have the same name as your Post-Export method! This method must accept a string parameter, which
               * will receive the path to the exported Unity player (or Xcode project in the case of iOS).
               */
              postExportMethod?: string;
              /**
               * Relative path to the script that should be run before the build process starts.
               */
              preBuildScript?: string;
              /**
               * Relative path to the script that should be run after the build process finishes.
               */
              postBuildScript?: string;
              /**
               * If this is true, a non-zero exit code on your preBuildScript will cause your build to be marked as Failed
               */
              preBuildScriptFailsBuild?: boolean;
              /**
               * If this is true, a non-zero exit code on your postBuildScript will cause your build to be marked as Failed
               */
              postBuildScriptFailsBuild?: boolean;
              /**
               * Enter the names of the symbols you want to define for iOS. These symbols can then be used as the conditions
               * for #if directives just like the built-in ones. (i.e. #IF MYDEFINE or #IF AMAZON)
               */
              scriptingDefineSymbols?: string;
              playerExporter?: {
                /**
                 * A list of scenes to build overriding those specified in the Build Settings menu of your Unity project.
                 */
                sceneList?: string[];
                /**
                 * Unity Editor build options. Use BuildOptions.Development and BuildOptions.AllowDebugging to create a development build.
                 */
                buildOptions?: string[];
                /**
                 * Enable exporting a player from Unity (i.e. running BuildPipeline.BuildPlayer). Enabling this is equivalent to disabling
                 * Content-only Build in Build Target on Developer Dashboard. In general, this should be true, unless you are doing something
                 * something like an asset bundle only build or unit test only build without generating an actual build artifact.
                 */
                export?: boolean;
              };
              playerSettings?: {
                Android?: {
                  /**
                   * break up android apk into an installable apk and expansion files
                   */
                  useAPKExpansionFiles?: boolean;
                };
              };
              editorUserBuildSettings?: {
                /**
                 * which android build system to build with (android only, supported in Unity 5.5+)
                 */
                androidBuildSystem?: "internal" | "gradle";
              };
              assetBundles?: {
                /**
                 * enable asset bundle builds for this target
                 */
                buildBundles?: boolean;
                /**
                 * base path relative to Assets folder where asset bundles are output. Default is 'AssetBundles'
                 */
                basePath?: string;
                /**
                 * comma separated list of flags from BuildAssetBundleOptions. see https://docs.unity3d.com/ScriptReference/BuildAssetBundleOptions.html
                 */
                buildAssetBundleOptions?: string;
                /**
                 * copy bundles to streaming assets folder, which will be packaged into the exported player.
                 */
                copyToStreamingAssets?: boolean;
                /**
                 * array of patterns to match (C# Regular Expressions) when copying asset bundle files. By default, all bundles will be copied.
                 */
                copyBundlePatterns?: string[];
              };
              addressables?: {
                /**
                 * enable addressable builds for this target
                 */
                buildAddressables?: boolean;
                /**
                 * Update a previously built player with new Addressable Content.
                 */
                contentUpdate?: boolean;
                /**
                 * which addressables profile should be used for the build
                 */
                profileName?: string;
                /**
                 * Exit and mark the build as failed if an error occurs when addressables are built
                 */
                failedAddressablesFailsBuild?: boolean;
                contentUpdateSettings?: {
                  /**
                   * The path to a Content State .bin file relative to the project root
                   */
                  contentStatePath?: string;
                  /**
                   * The Id of the build target to obtain a Content State .bin file from
                   */
                  linkedTargetId?: string;
                };
              };
              /**
               * Run any unit tests your project has when a build happens.
               */
              runUnitTests?: boolean;
              /**
               * Should Edit Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runEditModeTests?: boolean;
              /**
               * Should Play Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runPlayModeTests?: boolean;
              /**
               * Mark builds as failed if the unit tests do not pass.
               */
              failedUnitTestFailsBuild?: boolean;
              /**
               * LEGACY - The Unity method to call when running unit tests (only supported in Unity 5.2 and lower).
               */
              unitTestMethod?: string;
              /**
               * Enable lightmap baking (disabled by default since it is very slow and usually unnecessary)
               */
              enableLightBake?: boolean;
            };
          };
        };
        lastBuilt?: {
          /**
           * Last Unity version built by this target. Setting this has no effect.
           */
          unityVersion?: string;
        };
        credentials?: {
          signing?: {
            credentialid?: string;
            credentialResourceRef?: {
              platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
              label?: string;
              credentialid?: string;
              created?: string;
              lastMod?: string;
              certificate?: {
                /**
                 * generated team id from Apple
                 */
                teamId?: string;
                /**
                 * certificate name (from the certificate)
                 */
                certName?: string;
                /**
                 * expiration date
                 */
                expiration?: string;
                /**
                 * if this is a distribution certificate
                 */
                isDistribution?: boolean;
                /**
                 * issuer of the certificate
                 */
                issuer?: string;
                /**
                 * uploaded date
                 */
                uploaded?: string;
              };
              provisioningProfile?: {
                /**
                 * generated team id from Apple
                 */
                teamId?: string;
                /**
                 * a unique identifier (com.example.name)
                 */
                bundleId?: string;
                /**
                 * generated UUID of the profile
                 */
                uuid?: string;
                /**
                 * expiration date
                 */
                expiration?: string;
                /**
                 * is this compiled for Apple's enterprise program
                 */
                isEnterpriseProfile?: boolean;
                type?: "developer" | "adhoc" | "appstore";
                /**
                 * number of devices provisioned for this certificate
                 */
                numDevices?: number;
                /**
                 * uploaded date
                 */
                uploaded?: string;
              };
              keystore?: {
                /**
                 * friendly name for keystore
                 */
                alias?: string;
                /**
                 * whether this is a debug or production keystore
                 */
                debug?: boolean;
                /**
                 * expiration date
                 */
                expiration?: string;
              };
              links?: {
              };
            };
          };
        };
        builds?: {
          build?: number;
          /**
           * unique id auto-generated from the build target name
           */
          buildtargetid?: string;
          buildTargetName?: string;
          /**
           * unique GUID identifying this build
           */
          buildGUID?: string;
          buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
          /**
           * if the build was built without using data cached from previous builds
           */
          cleanBuild?: boolean;
          /**
           * list of failure details for this build attempt, when available
           */
          failureDetails?: {
            label?: string;
            resolutionHint?: string;
            stages?: string[];
            failureType?: string;
            count?: number;
          }[];
          canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of workspace in bytes
           */
          workspaceSize?: number;
          /**
           * when the build was created
           */
          created?: string;
          /**
           * when the build completely finished
           */
          finished?: string;
          /**
           * when the build starting checking out code
           */
          checkoutStartTime?: string;
          /**
           * amount of time spent checking out code
           */
          checkoutTimeInSeconds?: number;
          /**
           * when the build started compiling
           */
          buildStartTime?: string;
          /**
           * amount of time spend compiling
           */
          buildTimeInSeconds?: number;
          /**
           * when the build started saving build artifacts
           */
          publishStartTime?: string;
          /**
           * amount of time spent saving build artifacts
           */
          publishTimeInSeconds?: number;
          /**
           * total time for the build
           */
          totalTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          unitTestTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          editModeTestTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          playModeTestTimeInSeconds?: number;
          /**
           * source control commit id for the build
           */
          lastBuiltRevision?: string;
          /**
           * a list of source control changes between this and the last build
           */
          changeset?: {
          }[];
          /**
           * if the build is marked as do not delete or not
           */
          favorited?: boolean;
          /**
           * description given when a build is favorited
           */
          label?: string;
          /**
           * if the build is deleted or not
           */
          deleted?: boolean;
          /**
           * if the build was built to run in linux headless mode
           */
          headless?: any;
          /**
           * if a newer credential has been attached to this buildtarget and the build can be re-signed
           */
          credentialsOutdated?: boolean;
          /**
           * email address of the user who deleted this attempt
           */
          deletedBy?: string;
          /**
           * reason the build is currently waiting
           */
          queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
          /**
           * time until this build will be reconsidered for building
           */
          cooldownDate?: string;
          /**
           * scm branch to be built
           */
          scmBranch?: string;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * 'latest' or a supported xcode version (ex. 'xcode7')
           */
          xcodeVersion?: string;
          auditChanges?: number;
          projectVersion?: {
            /**
             * automatically generated name for the build
             */
            name?: string;
            /**
             * filename for the primary artifact
             */
            filename?: string;
            /**
             * name of the project
             */
            projectName?: string;
            platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
            /**
             * size of the the primary build artifact in bytes
             */
            size?: number;
            /**
             * creation date
             */
            created?: string;
            /**
             * last modified date
             */
            lastMod?: string;
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * iPhone unique identifiers that are able to install this build
             */
            udids?: string[];
            /**
             * links to build artifacts
             */
            links?: {
            };
          };
          projectName?: string;
          projectId?: string;
          projectGuid?: string;
          orgId?: string;
          orgFk?: string;
          filetoken?: string;
          links?: {
            [name: string]: {
              href?: string;
              method?: string;
              meta?: {
              };
            };
          };
          buildReport?: {
            errors?: number;
            warnings?: number;
          };
          /**
           * results from the build's unit tests, if any
           */
          testResults?: {
            unit_test?: {
            };
            unit_test_editmode?: {
            };
            unit_test_playmode?: {
            };
          };
          error?: string;
        }[];
        links?: {
        };
      }[];
    }
  }
  namespace GetBuilds {
    namespace Responses {
      export type $200 = {
        build?: number;
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        buildTargetName?: string;
        /**
         * unique GUID identifying this build
         */
        buildGUID?: string;
        buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
        /**
         * if the build was built without using data cached from previous builds
         */
        cleanBuild?: boolean;
        /**
         * list of failure details for this build attempt, when available
         */
        failureDetails?: {
          label?: string;
          resolutionHint?: string;
          stages?: string[];
          failureType?: string;
          count?: number;
        }[];
        canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * size of workspace in bytes
         */
        workspaceSize?: number;
        /**
         * when the build was created
         */
        created?: string;
        /**
         * when the build completely finished
         */
        finished?: string;
        /**
         * when the build starting checking out code
         */
        checkoutStartTime?: string;
        /**
         * amount of time spent checking out code
         */
        checkoutTimeInSeconds?: number;
        /**
         * when the build started compiling
         */
        buildStartTime?: string;
        /**
         * amount of time spend compiling
         */
        buildTimeInSeconds?: number;
        /**
         * when the build started saving build artifacts
         */
        publishStartTime?: string;
        /**
         * amount of time spent saving build artifacts
         */
        publishTimeInSeconds?: number;
        /**
         * total time for the build
         */
        totalTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        unitTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        editModeTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        playModeTestTimeInSeconds?: number;
        /**
         * source control commit id for the build
         */
        lastBuiltRevision?: string;
        /**
         * a list of source control changes between this and the last build
         */
        changeset?: {
        }[];
        /**
         * if the build is marked as do not delete or not
         */
        favorited?: boolean;
        /**
         * description given when a build is favorited
         */
        label?: string;
        /**
         * if the build is deleted or not
         */
        deleted?: boolean;
        /**
         * if the build was built to run in linux headless mode
         */
        headless?: any;
        /**
         * if a newer credential has been attached to this buildtarget and the build can be re-signed
         */
        credentialsOutdated?: boolean;
        /**
         * email address of the user who deleted this attempt
         */
        deletedBy?: string;
        /**
         * reason the build is currently waiting
         */
        queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
        /**
         * time until this build will be reconsidered for building
         */
        cooldownDate?: string;
        /**
         * scm branch to be built
         */
        scmBranch?: string;
        /**
         * 'latest' or a unity dot version with underscores (ex. '4_6_5')
         */
        unityVersion?: string;
        /**
         * 'latest' or a supported xcode version (ex. 'xcode7')
         */
        xcodeVersion?: string;
        auditChanges?: number;
        projectVersion?: {
          /**
           * automatically generated name for the build
           */
          name?: string;
          /**
           * filename for the primary artifact
           */
          filename?: string;
          /**
           * name of the project
           */
          projectName?: string;
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of the the primary build artifact in bytes
           */
          size?: number;
          /**
           * creation date
           */
          created?: string;
          /**
           * last modified date
           */
          lastMod?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * iPhone unique identifiers that are able to install this build
           */
          udids?: string[];
          /**
           * links to build artifacts
           */
          links?: {
          };
        };
        projectName?: string;
        projectId?: string;
        projectGuid?: string;
        orgId?: string;
        orgFk?: string;
        filetoken?: string;
        links?: {
          [name: string]: {
            href?: string;
            method?: string;
            meta?: {
            };
          };
        };
        buildReport?: {
          errors?: number;
          warnings?: number;
        };
        /**
         * results from the build's unit tests, if any
         */
        testResults?: {
          unit_test?: {
          };
          unit_test_editmode?: {
          };
          unit_test_playmode?: {
          };
        };
        error?: string;
      }[];
    }
  }
  namespace GetBuildsForOrg {
    namespace Responses {
      export type $200 = {
        build?: number;
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        buildTargetName?: string;
        /**
         * unique GUID identifying this build
         */
        buildGUID?: string;
        buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
        /**
         * if the build was built without using data cached from previous builds
         */
        cleanBuild?: boolean;
        /**
         * list of failure details for this build attempt, when available
         */
        failureDetails?: {
          label?: string;
          resolutionHint?: string;
          stages?: string[];
          failureType?: string;
          count?: number;
        }[];
        canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * size of workspace in bytes
         */
        workspaceSize?: number;
        /**
         * when the build was created
         */
        created?: string;
        /**
         * when the build completely finished
         */
        finished?: string;
        /**
         * when the build starting checking out code
         */
        checkoutStartTime?: string;
        /**
         * amount of time spent checking out code
         */
        checkoutTimeInSeconds?: number;
        /**
         * when the build started compiling
         */
        buildStartTime?: string;
        /**
         * amount of time spend compiling
         */
        buildTimeInSeconds?: number;
        /**
         * when the build started saving build artifacts
         */
        publishStartTime?: string;
        /**
         * amount of time spent saving build artifacts
         */
        publishTimeInSeconds?: number;
        /**
         * total time for the build
         */
        totalTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        unitTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        editModeTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        playModeTestTimeInSeconds?: number;
        /**
         * source control commit id for the build
         */
        lastBuiltRevision?: string;
        /**
         * a list of source control changes between this and the last build
         */
        changeset?: {
        }[];
        /**
         * if the build is marked as do not delete or not
         */
        favorited?: boolean;
        /**
         * description given when a build is favorited
         */
        label?: string;
        /**
         * if the build is deleted or not
         */
        deleted?: boolean;
        /**
         * if the build was built to run in linux headless mode
         */
        headless?: any;
        /**
         * if a newer credential has been attached to this buildtarget and the build can be re-signed
         */
        credentialsOutdated?: boolean;
        /**
         * email address of the user who deleted this attempt
         */
        deletedBy?: string;
        /**
         * reason the build is currently waiting
         */
        queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
        /**
         * time until this build will be reconsidered for building
         */
        cooldownDate?: string;
        /**
         * scm branch to be built
         */
        scmBranch?: string;
        /**
         * 'latest' or a unity dot version with underscores (ex. '4_6_5')
         */
        unityVersion?: string;
        /**
         * 'latest' or a supported xcode version (ex. 'xcode7')
         */
        xcodeVersion?: string;
        auditChanges?: number;
        projectVersion?: {
          /**
           * automatically generated name for the build
           */
          name?: string;
          /**
           * filename for the primary artifact
           */
          filename?: string;
          /**
           * name of the project
           */
          projectName?: string;
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of the the primary build artifact in bytes
           */
          size?: number;
          /**
           * creation date
           */
          created?: string;
          /**
           * last modified date
           */
          lastMod?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * iPhone unique identifiers that are able to install this build
           */
          udids?: string[];
          /**
           * links to build artifacts
           */
          links?: {
          };
        };
        projectName?: string;
        projectId?: string;
        projectGuid?: string;
        orgId?: string;
        orgFk?: string;
        filetoken?: string;
        links?: {
          [name: string]: {
            href?: string;
            method?: string;
            meta?: {
            };
          };
        };
        buildReport?: {
          errors?: number;
          warnings?: number;
        };
        /**
         * results from the build's unit tests, if any
         */
        testResults?: {
          unit_test?: {
          };
          unit_test_editmode?: {
          };
          unit_test_playmode?: {
          };
        };
        error?: string;
      }[];
    }
  }
  namespace GetChangeLogs {
    namespace Responses {
      export type $200 = {
        logType: string;
        message: string;
        created?: string; // dateTime
      }[];
    }
  }
  namespace GetEnvVariablesForBuildTarget {
    namespace Responses {
      /**
       * Object containing env variables. Name must follow env variable spec - a word consisting solely of underscores,
       * digits, and alphabetics from the portable character set. The first character of a name is not a digit. May not
       * override widely used env variables (see IEEE Std 1003.1-2008).
       * example:
       * {
       *   "MY_ENV_VARIABLE": "yellow",
       *   "BUILD_SERVICE": "https://build-api.cloud.unity3d.com/",
       *   "PORT": "1000"
       * }
       */
      export interface $200 {
        [name: string]: string;
      }
    }
  }
  namespace GetEnvVariablesForProject {
    namespace Responses {
      /**
       * Object containing env variables. Name must follow env variable spec - a word consisting solely of underscores,
       * digits, and alphabetics from the portable character set. The first character of a name is not a digit. May not
       * override widely used env variables (see IEEE Std 1003.1-2008).
       * example:
       * {
       *   "MY_ENV_VARIABLE": "yellow",
       *   "BUILD_SERVICE": "https://build-api.cloud.unity3d.com/",
       *   "PORT": "1000"
       * }
       */
      export interface $200 {
        [name: string]: string;
      }
    }
  }
  namespace GetHookForOrg {
    namespace Responses {
      export interface $200 {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
        id?: string;
      }
    }
  }
  namespace GetHookForProject {
    namespace Responses {
      export interface $200 {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
        id?: string;
      }
    }
  }
  namespace GetOneAndroid {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        keystore?: {
          /**
           * friendly name for keystore
           */
          alias?: string;
          /**
           * whether this is a debug or production keystore
           */
          debug?: boolean;
          expiration?: string;
        };
        links?: {
        };
      }
    }
  }
  namespace GetOneAndroidForOrg {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        keystore?: {
          /**
           * friendly name for keystore
           */
          alias?: string;
          /**
           * whether this is a debug or production keystore
           */
          debug?: boolean;
          expiration?: string;
        };
        links?: {
        };
      }
    }
  }
  namespace GetOneIos {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * certificate name (from the certificate)
           */
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * if this is a distribution certificate
           */
          isDistribution?: boolean;
          /**
           * issuer of the certificate
           */
          issuer?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        provisioningProfile?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * is this compiled for Apple's enterprise program
           */
          isEnterpriseProfile?: boolean;
          type?: "developer" | "adhoc" | "appstore";
          /**
           * number of devices provisioned for this certificate
           */
          numDevices?: number;
          /**
           * uploaded date
           */
          uploaded?: string;
          /**
           * provisoned udids
           */
          provisionedDevices?: string[];
        };
        links?: {
        };
      }
    }
  }
  namespace GetOneIosForOrg {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * certificate name (from the certificate)
           */
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * if this is a distribution certificate
           */
          isDistribution?: boolean;
          /**
           * issuer of the certificate
           */
          issuer?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        provisioningProfile?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * is this compiled for Apple's enterprise program
           */
          isEnterpriseProfile?: boolean;
          type?: "developer" | "adhoc" | "appstore";
          /**
           * number of devices provisioned for this certificate
           */
          numDevices?: number;
          /**
           * uploaded date
           */
          uploaded?: string;
          /**
           * provisoned udids
           */
          provisionedDevices?: string[];
        };
        links?: {
        };
      }
    }
  }
  namespace GetOneOsx {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        providerName?: string;
        appleIdUsername?: string;
        links?: {
        };
      }
    }
  }
  namespace GetOneOsxForOrg {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        providerName?: string;
        appleIdUsername?: string;
        links?: {
        };
      }
    }
  }
  namespace GetProject {
    namespace Responses {
      export interface $200 {
        name?: string;
        projectid?: string;
        orgName?: string;
        orgid?: string;
        orgFk?: string;
        guid?: string;
        created?: string;
        cachedIcon?: string;
        serviceFlags?: {
        };
        links?: {
        };
        disabled?: boolean;
        disableNotifications?: boolean;
        generateShareLinks?: boolean;
        settings?: {
          remoteCacheStrategy?: "none" | "library" | "workspace";
          scm?: {
            oauth?: {
              scm_provider?: string;
              temp_state?: string;
              github?: {
                repository?: {
                };
              };
              gitlab?: {
                repository?: {
                };
              };
              bitbucket?: {
                repository?: {
                };
              };
            };
          };
        };
      }
    }
  }
  namespace GetProjectByUpid {
    namespace Responses {
      export interface $200 {
        name?: string;
        projectid?: string;
        orgName?: string;
        orgid?: string;
        orgFk?: string;
        guid?: string;
        created?: string;
        cachedIcon?: string;
        serviceFlags?: {
        };
        links?: {
        };
        disabled?: boolean;
        disableNotifications?: boolean;
        generateShareLinks?: boolean;
        settings?: {
          remoteCacheStrategy?: "none" | "library" | "workspace";
          scm?: {
            oauth?: {
              scm_provider?: string;
              temp_state?: string;
              github?: {
                repository?: {
                };
              };
              gitlab?: {
                repository?: {
                };
              };
              bitbucket?: {
                repository?: {
                };
              };
            };
          };
        };
      }
    }
  }
  namespace GetSSHKeyForOrg {
    namespace Responses {
      export interface $200 {
        publickey?: string;
      }
    }
  }
  namespace GetSSHKeyForProject {
    namespace Responses {
      export interface $200 {
        publickey?: string;
      }
    }
  }
  namespace GetShare {
    namespace Responses {
      export interface $200 {
        shareid?: string;
        shareExpiry?: string;
      }
      export type $404 = string;
    }
  }
  namespace GetShareMetadata {
    namespace Responses {
      /**
       * buildattempt
       */
      export interface $200 {
        build?: number;
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        buildTargetName?: string;
        /**
         * unique GUID identifying this build
         */
        buildGUID?: string;
        buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
        /**
         * if the build was built without using data cached from previous builds
         */
        cleanBuild?: boolean;
        /**
         * list of failure details for this build attempt, when available
         */
        failureDetails?: {
          label?: string;
          resolutionHint?: string;
          stages?: string[];
          failureType?: string;
          count?: number;
        }[];
        canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * size of workspace in bytes
         */
        workspaceSize?: number;
        /**
         * when the build was created
         */
        created?: string;
        /**
         * when the build completely finished
         */
        finished?: string;
        /**
         * when the build starting checking out code
         */
        checkoutStartTime?: string;
        /**
         * amount of time spent checking out code
         */
        checkoutTimeInSeconds?: number;
        /**
         * when the build started compiling
         */
        buildStartTime?: string;
        /**
         * amount of time spend compiling
         */
        buildTimeInSeconds?: number;
        /**
         * when the build started saving build artifacts
         */
        publishStartTime?: string;
        /**
         * amount of time spent saving build artifacts
         */
        publishTimeInSeconds?: number;
        /**
         * total time for the build
         */
        totalTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        unitTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        editModeTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        playModeTestTimeInSeconds?: number;
        /**
         * source control commit id for the build
         */
        lastBuiltRevision?: string;
        /**
         * a list of source control changes between this and the last build
         */
        changeset?: {
        }[];
        /**
         * if the build is marked as do not delete or not
         */
        favorited?: boolean;
        /**
         * description given when a build is favorited
         */
        label?: string;
        /**
         * if the build is deleted or not
         */
        deleted?: boolean;
        /**
         * if the build was built to run in linux headless mode
         */
        headless?: any;
        /**
         * if a newer credential has been attached to this buildtarget and the build can be re-signed
         */
        credentialsOutdated?: boolean;
        /**
         * email address of the user who deleted this attempt
         */
        deletedBy?: string;
        /**
         * reason the build is currently waiting
         */
        queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
        /**
         * time until this build will be reconsidered for building
         */
        cooldownDate?: string;
        /**
         * scm branch to be built
         */
        scmBranch?: string;
        /**
         * 'latest' or a unity dot version with underscores (ex. '4_6_5')
         */
        unityVersion?: string;
        /**
         * 'latest' or a supported xcode version (ex. 'xcode7')
         */
        xcodeVersion?: string;
        auditChanges?: number;
        projectVersion?: {
          /**
           * automatically generated name for the build
           */
          name?: string;
          /**
           * filename for the primary artifact
           */
          filename?: string;
          /**
           * name of the project
           */
          projectName?: string;
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of the the primary build artifact in bytes
           */
          size?: number;
          /**
           * creation date
           */
          created?: string;
          /**
           * last modified date
           */
          lastMod?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * iPhone unique identifiers that are able to install this build
           */
          udids?: string[];
          /**
           * links to build artifacts
           */
          links?: {
          };
        };
        projectName?: string;
        projectId?: string;
        projectGuid?: string;
        orgId?: string;
        orgFk?: string;
        filetoken?: string;
        links?: {
          [name: string]: {
            href?: string;
            method?: string;
            meta?: {
            };
          };
        };
        buildReport?: {
          errors?: number;
          warnings?: number;
        };
        /**
         * results from the build's unit tests, if any
         */
        testResults?: {
          unit_test?: {
          };
          unit_test_editmode?: {
          };
          unit_test_playmode?: {
          };
        };
        error?: string;
      }
    }
  }
  namespace GetStatsForBuildTarget {
    namespace Responses {
      export interface $200 {
        totalBuilds?: number;
        successfulBuilds?: number;
        canceledBuilds?: number;
        failedBuilds?: number;
        averageWorkspaceSize?: number;
        averageTotalTime?: number;
        averageWaitTime?: number;
        averageCheckoutTime?: number;
        averageBuildTime?: number;
        averagePublishTime?: number;
      }
    }
  }
  namespace GetStatsForProject {
    namespace Responses {
      export interface $200 {
        jobCount?: number;
        buildSuccessHealth?: number;
        buildPoorHealth?: number;
        buildCancelHealth?: number;
        buildPendingHealth?: number;
        successfulBuilds?: number;
        canceledBuilds?: number;
        failedBuilds?: number;
        averageTime?: number;
        averageWorkspaceSize?: number;
        averageWaitTime?: number;
        maxConcurrentBuilds?: number;
        availableConcurrentBuilds?: number;
        maxConcurrentBuildsGCP?: number;
        availableConcurrentBuildsGCP?: number;
      }
    }
  }
  namespace GetStatus {
    namespace Responses {
      export type $200 = {
        text?: string;
        redirect?: string;
        priority?: number;
        scmType?: string;
        billingPlan?: string;
        platform?: string;
        alertType?: string;
        autoClear?: boolean;
      }[];
    }
  }
  namespace GetUserApiKey {
    namespace Responses {
      export interface $200 {
        /**
         * API key
         */
        apiKey?: string;
      }
    }
  }
  namespace GetUserSelf {
    namespace Responses {
      export interface $200 {
        /**
         * email address
         */
        email?: string;
        /**
         * full name
         */
        name?: string;
        /**
         * internal unity id that is shared across services
         */
        unityid?: string;
        /**
         * when true the user is waiting to be approved for access to Cloud Build
         */
        waiting?: boolean;
        /**
         * when true build status email notifications will no longer be sent
         */
        disableNotifications?: boolean;
        /**
         * primary organization the user belongs to
         */
        primaryOrg?: string;
        /**
         * links for retrieving more information about the user
         */
        links?: {
        };
      }
    }
  }
  namespace GetVersion {
    namespace Responses {
      export interface $200 {
        name?: string;
        value?: string;
        xcode_versions?: string[];
        hidden?: boolean;
        deprecated?: boolean;
        cloudRenderingEnabled?: boolean;
      }
    }
  }
  namespace ListDevicesForUser {
    namespace Responses {
      export type $200 = {
        udid: string;
        devicename?: string;
        os?: string;
        osversion?: string;
        product?: string;
        status?: "disabled" | "active";
      }[];
    }
  }
  namespace ListHooksForOrg {
    namespace Responses {
      export type $200 = {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
        id?: string;
      }[];
    }
  }
  namespace ListHooksForProject {
    namespace Responses {
      export type $200 = {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
        id?: string;
      }[];
    }
  }
  namespace ListProjectsForOrg {
    namespace Responses {
      export type $200 = {
        name?: string;
        projectid?: string;
        orgName?: string;
        orgid?: string;
        orgFk?: string;
        guid?: string;
        created?: string;
        cachedIcon?: string;
        serviceFlags?: {
        };
        links?: {
        };
        disabled?: boolean;
        disableNotifications?: boolean;
        generateShareLinks?: boolean;
        settings?: {
          remoteCacheStrategy?: "none" | "library" | "workspace";
          scm?: {
            oauth?: {
              scm_provider?: string;
              temp_state?: string;
              github?: {
                repository?: {
                };
              };
              gitlab?: {
                repository?: {
                };
              };
              bitbucket?: {
                repository?: {
                };
              };
            };
          };
        };
      }[];
    }
  }
  namespace ListProjectsForUser {
    namespace Responses {
      /**
       * projects
       */
      export type $200 = {
        name?: string;
        projectid?: string;
        orgName?: string;
        orgid?: string;
        orgFk?: string;
        guid?: string;
        created?: string;
        cachedIcon?: string;
        serviceFlags?: {
        };
        links?: {
        };
        disabled?: boolean;
        disableNotifications?: boolean;
        generateShareLinks?: boolean;
        settings?: {
          remoteCacheStrategy?: "none" | "library" | "workspace";
          scm?: {
            oauth?: {
              scm_provider?: string;
              temp_state?: string;
              github?: {
                repository?: {
                };
              };
              gitlab?: {
                repository?: {
                };
              };
              bitbucket?: {
                repository?: {
                };
              };
            };
          };
        };
      }[];
    }
  }
  namespace ListScmsSupportingVersionAutoDetect {
    namespace Responses {
      export type $200 = string[];
    }
  }
  namespace ListUnityVersions {
    namespace Responses {
      export type $200 = {
        name?: string;
        value?: string;
        xcode_versions?: string[];
        hidden?: boolean;
        deprecated?: boolean;
        cloudRenderingEnabled?: boolean;
      }[];
    }
  }
  namespace ListXcodeVersions {
    namespace Responses {
      export type $200 = {
        name?: string;
        value?: string;
        hidden?: boolean;
        deprecated?: boolean;
      }[];
    }
  }
  namespace ModifyShare {
    export interface BodyParameters {
      shareExpiry?: Parameters.ShareExpiry;
    }
    namespace Parameters {
      export interface ShareExpiry {
        shareExpiry?: string;
      }
    }
    namespace Responses {
      export interface $201 {
        shareid?: string;
        shareExpiry?: string;
      }
      export type $404 = string;
    }
  }
  namespace PingHookForOrg {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace PingHookForProject {
    namespace Responses {
      export type $204 = string;
    }
  }
  namespace RegenApiKey {
    namespace Responses {
      export interface $200 {
        apiKey?: string;
      }
    }
  }
  namespace RegenerateSSHKey {
    namespace Responses {
      export interface $201 {
        publickey?: string;
      }
    }
  }
  namespace ResignBuildArtifact {
    namespace Responses {
      export type $202 = {
        build?: number;
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        buildTargetName?: string;
        /**
         * unique GUID identifying this build
         */
        buildGUID?: string;
        buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
        /**
         * if the build was built without using data cached from previous builds
         */
        cleanBuild?: boolean;
        /**
         * list of failure details for this build attempt, when available
         */
        failureDetails?: {
          label?: string;
          resolutionHint?: string;
          stages?: string[];
          failureType?: string;
          count?: number;
        }[];
        canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * size of workspace in bytes
         */
        workspaceSize?: number;
        /**
         * when the build was created
         */
        created?: string;
        /**
         * when the build completely finished
         */
        finished?: string;
        /**
         * when the build starting checking out code
         */
        checkoutStartTime?: string;
        /**
         * amount of time spent checking out code
         */
        checkoutTimeInSeconds?: number;
        /**
         * when the build started compiling
         */
        buildStartTime?: string;
        /**
         * amount of time spend compiling
         */
        buildTimeInSeconds?: number;
        /**
         * when the build started saving build artifacts
         */
        publishStartTime?: string;
        /**
         * amount of time spent saving build artifacts
         */
        publishTimeInSeconds?: number;
        /**
         * total time for the build
         */
        totalTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        unitTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        editModeTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        playModeTestTimeInSeconds?: number;
        /**
         * source control commit id for the build
         */
        lastBuiltRevision?: string;
        /**
         * a list of source control changes between this and the last build
         */
        changeset?: {
        }[];
        /**
         * if the build is marked as do not delete or not
         */
        favorited?: boolean;
        /**
         * description given when a build is favorited
         */
        label?: string;
        /**
         * if the build is deleted or not
         */
        deleted?: boolean;
        /**
         * if the build was built to run in linux headless mode
         */
        headless?: any;
        /**
         * if a newer credential has been attached to this buildtarget and the build can be re-signed
         */
        credentialsOutdated?: boolean;
        /**
         * email address of the user who deleted this attempt
         */
        deletedBy?: string;
        /**
         * reason the build is currently waiting
         */
        queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
        /**
         * time until this build will be reconsidered for building
         */
        cooldownDate?: string;
        /**
         * scm branch to be built
         */
        scmBranch?: string;
        /**
         * 'latest' or a unity dot version with underscores (ex. '4_6_5')
         */
        unityVersion?: string;
        /**
         * 'latest' or a supported xcode version (ex. 'xcode7')
         */
        xcodeVersion?: string;
        auditChanges?: number;
        projectVersion?: {
          /**
           * automatically generated name for the build
           */
          name?: string;
          /**
           * filename for the primary artifact
           */
          filename?: string;
          /**
           * name of the project
           */
          projectName?: string;
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of the the primary build artifact in bytes
           */
          size?: number;
          /**
           * creation date
           */
          created?: string;
          /**
           * last modified date
           */
          lastMod?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * iPhone unique identifiers that are able to install this build
           */
          udids?: string[];
          /**
           * links to build artifacts
           */
          links?: {
          };
        };
        projectName?: string;
        projectId?: string;
        projectGuid?: string;
        orgId?: string;
        orgFk?: string;
        filetoken?: string;
        links?: {
          [name: string]: {
            href?: string;
            method?: string;
            meta?: {
            };
          };
        };
        buildReport?: {
          errors?: number;
          warnings?: number;
        };
        /**
         * results from the build's unit tests, if any
         */
        testResults?: {
          unit_test?: {
          };
          unit_test_editmode?: {
          };
          unit_test_playmode?: {
          };
        };
        error?: string;
      }[];
    }
  }
  namespace RevokeShare {
    namespace Responses {
      export type $204 = string;
      export type $404 = string;
    }
  }
  namespace SetEnvVariablesForBuildTarget {
    export interface BodyParameters {
      envvars: Parameters.Envvars;
    }
    namespace Parameters {
      /**
       * Object containing env variables. Name must follow env variable spec - a word consisting solely of underscores,
       * digits, and alphabetics from the portable character set. The first character of a name is not a digit. May not
       * override widely used env variables (see IEEE Std 1003.1-2008).
       * example:
       * {
       *   "MY_ENV_VARIABLE": "yellow",
       *   "BUILD_SERVICE": "https://build-api.cloud.unity3d.com/",
       *   "PORT": "1000"
       * }
       */
      export interface Envvars {
        [name: string]: string;
      }
    }
    namespace Responses {
      /**
       * Object containing env variables. Name must follow env variable spec - a word consisting solely of underscores,
       * digits, and alphabetics from the portable character set. The first character of a name is not a digit. May not
       * override widely used env variables (see IEEE Std 1003.1-2008).
       * example:
       * {
       *   "MY_ENV_VARIABLE": "yellow",
       *   "BUILD_SERVICE": "https://build-api.cloud.unity3d.com/",
       *   "PORT": "1000"
       * }
       */
      export interface $200 {
        [name: string]: string;
      }
    }
  }
  namespace SetEnvVariablesForProject {
    export interface BodyParameters {
      envvars: Parameters.Envvars;
    }
    namespace Parameters {
      /**
       * Object containing env variables. Name must follow env variable spec - a word consisting solely of underscores,
       * digits, and alphabetics from the portable character set. The first character of a name is not a digit. May not
       * override widely used env variables (see IEEE Std 1003.1-2008).
       * example:
       * {
       *   "MY_ENV_VARIABLE": "yellow",
       *   "BUILD_SERVICE": "https://build-api.cloud.unity3d.com/",
       *   "PORT": "1000"
       * }
       */
      export interface Envvars {
        [name: string]: string;
      }
    }
    namespace Responses {
      /**
       * Object containing env variables. Name must follow env variable spec - a word consisting solely of underscores,
       * digits, and alphabetics from the portable character set. The first character of a name is not a digit. May not
       * override widely used env variables (see IEEE Std 1003.1-2008).
       * example:
       * {
       *   "MY_ENV_VARIABLE": "yellow",
       *   "BUILD_SERVICE": "https://build-api.cloud.unity3d.com/",
       *   "PORT": "1000"
       * }
       */
      export interface $200 {
        [name: string]: string;
      }
    }
  }
  namespace StartBuilds {
    export interface BodyParameters {
      options?: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        clean?: boolean;
        /**
         * Delay to start build, in milliseconds
         */
        delay?: number;
        commit?: string;
        /**
         * Only valid for local builds
         * 
         */
        headless?: boolean;
        /**
         * Only valid for local builds
         * 
         */
        label?: string;
        /**
         * Only valid for local builds
         * 
         */
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
      }
    }
    namespace Responses {
      export type $202 = {
        build?: number;
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        buildTargetName?: string;
        /**
         * unique GUID identifying this build
         */
        buildGUID?: string;
        buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
        /**
         * if the build was built without using data cached from previous builds
         */
        cleanBuild?: boolean;
        /**
         * list of failure details for this build attempt, when available
         */
        failureDetails?: {
          label?: string;
          resolutionHint?: string;
          stages?: string[];
          failureType?: string;
          count?: number;
        }[];
        canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * size of workspace in bytes
         */
        workspaceSize?: number;
        /**
         * when the build was created
         */
        created?: string;
        /**
         * when the build completely finished
         */
        finished?: string;
        /**
         * when the build starting checking out code
         */
        checkoutStartTime?: string;
        /**
         * amount of time spent checking out code
         */
        checkoutTimeInSeconds?: number;
        /**
         * when the build started compiling
         */
        buildStartTime?: string;
        /**
         * amount of time spend compiling
         */
        buildTimeInSeconds?: number;
        /**
         * when the build started saving build artifacts
         */
        publishStartTime?: string;
        /**
         * amount of time spent saving build artifacts
         */
        publishTimeInSeconds?: number;
        /**
         * total time for the build
         */
        totalTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        unitTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        editModeTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        playModeTestTimeInSeconds?: number;
        /**
         * source control commit id for the build
         */
        lastBuiltRevision?: string;
        /**
         * a list of source control changes between this and the last build
         */
        changeset?: {
        }[];
        /**
         * if the build is marked as do not delete or not
         */
        favorited?: boolean;
        /**
         * description given when a build is favorited
         */
        label?: string;
        /**
         * if the build is deleted or not
         */
        deleted?: boolean;
        /**
         * if the build was built to run in linux headless mode
         */
        headless?: any;
        /**
         * if a newer credential has been attached to this buildtarget and the build can be re-signed
         */
        credentialsOutdated?: boolean;
        /**
         * email address of the user who deleted this attempt
         */
        deletedBy?: string;
        /**
         * reason the build is currently waiting
         */
        queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
        /**
         * time until this build will be reconsidered for building
         */
        cooldownDate?: string;
        /**
         * scm branch to be built
         */
        scmBranch?: string;
        /**
         * 'latest' or a unity dot version with underscores (ex. '4_6_5')
         */
        unityVersion?: string;
        /**
         * 'latest' or a supported xcode version (ex. 'xcode7')
         */
        xcodeVersion?: string;
        auditChanges?: number;
        projectVersion?: {
          /**
           * automatically generated name for the build
           */
          name?: string;
          /**
           * filename for the primary artifact
           */
          filename?: string;
          /**
           * name of the project
           */
          projectName?: string;
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of the the primary build artifact in bytes
           */
          size?: number;
          /**
           * creation date
           */
          created?: string;
          /**
           * last modified date
           */
          lastMod?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * iPhone unique identifiers that are able to install this build
           */
          udids?: string[];
          /**
           * links to build artifacts
           */
          links?: {
          };
        };
        projectName?: string;
        projectId?: string;
        projectGuid?: string;
        orgId?: string;
        orgFk?: string;
        filetoken?: string;
        links?: {
          [name: string]: {
            href?: string;
            method?: string;
            meta?: {
            };
          };
        };
        buildReport?: {
          errors?: number;
          warnings?: number;
        };
        /**
         * results from the build's unit tests, if any
         */
        testResults?: {
          unit_test?: {
          };
          unit_test_editmode?: {
          };
          unit_test_playmode?: {
          };
        };
        error?: string;
      }[];
    }
  }
  namespace UpdateAndroid {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        keystore?: {
          /**
           * friendly name for keystore
           */
          alias?: string;
          /**
           * whether this is a debug or production keystore
           */
          debug?: boolean;
          expiration?: string;
        };
        links?: {
        };
      }
    }
  }
  namespace UpdateAndroidForOrg {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        keystore?: {
          /**
           * friendly name for keystore
           */
          alias?: string;
          /**
           * whether this is a debug or production keystore
           */
          debug?: boolean;
          expiration?: string;
        };
        links?: {
        };
      }
    }
  }
  namespace UpdateBuild {
    export interface BodyParameters {
      options: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        favorited?: boolean;
        label?: string;
      }
    }
    namespace Responses {
      /**
       * buildattempt
       */
      export interface $200 {
        build?: number;
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        buildTargetName?: string;
        /**
         * unique GUID identifying this build
         */
        buildGUID?: string;
        buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
        /**
         * if the build was built without using data cached from previous builds
         */
        cleanBuild?: boolean;
        /**
         * list of failure details for this build attempt, when available
         */
        failureDetails?: {
          label?: string;
          resolutionHint?: string;
          stages?: string[];
          failureType?: string;
          count?: number;
        }[];
        canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * size of workspace in bytes
         */
        workspaceSize?: number;
        /**
         * when the build was created
         */
        created?: string;
        /**
         * when the build completely finished
         */
        finished?: string;
        /**
         * when the build starting checking out code
         */
        checkoutStartTime?: string;
        /**
         * amount of time spent checking out code
         */
        checkoutTimeInSeconds?: number;
        /**
         * when the build started compiling
         */
        buildStartTime?: string;
        /**
         * amount of time spend compiling
         */
        buildTimeInSeconds?: number;
        /**
         * when the build started saving build artifacts
         */
        publishStartTime?: string;
        /**
         * amount of time spent saving build artifacts
         */
        publishTimeInSeconds?: number;
        /**
         * total time for the build
         */
        totalTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        unitTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        editModeTestTimeInSeconds?: number;
        /**
         * total time for unit test execution step
         */
        playModeTestTimeInSeconds?: number;
        /**
         * source control commit id for the build
         */
        lastBuiltRevision?: string;
        /**
         * a list of source control changes between this and the last build
         */
        changeset?: {
        }[];
        /**
         * if the build is marked as do not delete or not
         */
        favorited?: boolean;
        /**
         * description given when a build is favorited
         */
        label?: string;
        /**
         * if the build is deleted or not
         */
        deleted?: boolean;
        /**
         * if the build was built to run in linux headless mode
         */
        headless?: any;
        /**
         * if a newer credential has been attached to this buildtarget and the build can be re-signed
         */
        credentialsOutdated?: boolean;
        /**
         * email address of the user who deleted this attempt
         */
        deletedBy?: string;
        /**
         * reason the build is currently waiting
         */
        queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
        /**
         * time until this build will be reconsidered for building
         */
        cooldownDate?: string;
        /**
         * scm branch to be built
         */
        scmBranch?: string;
        /**
         * 'latest' or a unity dot version with underscores (ex. '4_6_5')
         */
        unityVersion?: string;
        /**
         * 'latest' or a supported xcode version (ex. 'xcode7')
         */
        xcodeVersion?: string;
        auditChanges?: number;
        projectVersion?: {
          /**
           * automatically generated name for the build
           */
          name?: string;
          /**
           * filename for the primary artifact
           */
          filename?: string;
          /**
           * name of the project
           */
          projectName?: string;
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of the the primary build artifact in bytes
           */
          size?: number;
          /**
           * creation date
           */
          created?: string;
          /**
           * last modified date
           */
          lastMod?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * iPhone unique identifiers that are able to install this build
           */
          udids?: string[];
          /**
           * links to build artifacts
           */
          links?: {
          };
        };
        projectName?: string;
        projectId?: string;
        projectGuid?: string;
        orgId?: string;
        orgFk?: string;
        filetoken?: string;
        links?: {
          [name: string]: {
            href?: string;
            method?: string;
            meta?: {
            };
          };
        };
        buildReport?: {
          errors?: number;
          warnings?: number;
        };
        /**
         * results from the build's unit tests, if any
         */
        testResults?: {
          unit_test?: {
          };
          unit_test_editmode?: {
          };
          unit_test_playmode?: {
          };
        };
        error?: string;
      }
    }
  }
  namespace UpdateBuildTarget {
    export interface BodyParameters {
      options: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        name?: string;
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        enabled?: boolean;
        settings?: {
          /**
           * start builds automatically when your repo is updated
           */
          autoBuild?: boolean;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * attempt to automatically detect which unity version to use, fallback to specified unityVersion if unable to.
           */
          autoDetectUnityVersion?: boolean;
          /**
           * attempt to get a similar unity patch version to use, applies to unavailable auto-detected Unity versions only.
           */
          fallbackPatchVersion?: boolean;
          executablename?: string;
          scm?: {
            type?: "git" | "svn" | "p4" | "hg" | "collab" | "oauth" | "plastic";
            /**
             * Which repo to use. Only applies to Plastic SCM, other SCM types configure repo on the project level.
             */
            repo?: string;
            branch?: string;
            /**
             * subdirectory to build from
             */
            subdirectory?: string;
            /**
             * perforce only client workspace to build from
             */
            client?: string;
          };
          platform?: {
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * 'latest' or a supported xcode version (ex. 'xcode7')
             */
            xcodeVersion?: string;
          };
          /**
           * For Scheduling builds
           */
          buildSchedule?: {
            isEnabled?: boolean;
            date?: string; // date-time
            repeatCycle?: "none" | "once" | "daily" | "weekly" | "monthly" | "yearly";
            cleanBuild?: boolean;
          };
          autoBuildCancellation?: boolean;
          gcpBetaOptIn?: boolean;
          gcpOptOut?: boolean;
          advanced?: {
            xcode?: {
              useArchiveAndExport?: boolean;
              /**
               * The path (including file name) from the project root to the custom FastLane configuration json file to configure multiple provisioning files, or customize the FastLane build process.
               * See https://forum.unity.com/threads/xcode-9-multiple-provisioning-profiles.545121/
               * Will look for Assets/ucb_xcode_fastlane.json by default, if not specified.
               */
              customFastlaneConfigPath?: string;
              /**
               * Only used with OSX targets, this triggers signing and notarization process for the executable.
               */
              shouldNotarize?: boolean;
            };
            android?: {
              buildAppBundle?: boolean;
              buildAssetPacks?: boolean;
            };
            unity?: {
              /**
               * The fully-qualified name of a public static method you want us to call before we start the Unity build process.
               * For example: ClassName.NeatMethod or NameSpace.ClassName.NeatMethod.
               * No trailing parenthesis, and it can't have the same name as your Post-Export method!
               */
              preExportMethod?: string;
              /**
               * The fully-qualified name of a public static method you want us to call after we finish the Unity build process
               * (but before Xcode). For example: ClassName.CoolMethod or NameSpace.ClassName.CoolMethod. No trailing parenthesis,
               * and it can't have the same name as your Post-Export method! This method must accept a string parameter, which
               * will receive the path to the exported Unity player (or Xcode project in the case of iOS).
               */
              postExportMethod?: string;
              /**
               * Relative path to the script that should be run before the build process starts.
               */
              preBuildScript?: string;
              /**
               * Relative path to the script that should be run after the build process finishes.
               */
              postBuildScript?: string;
              /**
               * If this is true, a non-zero exit code on your preBuildScript will cause your build to be marked as Failed
               */
              preBuildScriptFailsBuild?: boolean;
              /**
               * If this is true, a non-zero exit code on your postBuildScript will cause your build to be marked as Failed
               */
              postBuildScriptFailsBuild?: boolean;
              /**
               * Enter the names of the symbols you want to define for iOS. These symbols can then be used as the conditions
               * for #if directives just like the built-in ones. (i.e. #IF MYDEFINE or #IF AMAZON)
               */
              scriptingDefineSymbols?: string;
              playerExporter?: {
                /**
                 * A list of scenes to build overriding those specified in the Build Settings menu of your Unity project.
                 */
                sceneList?: string[];
                /**
                 * Unity Editor build options. Use BuildOptions.Development and BuildOptions.AllowDebugging to create a development build.
                 */
                buildOptions?: string[];
                /**
                 * Enable exporting a player from Unity (i.e. running BuildPipeline.BuildPlayer). Enabling this is equivalent to disabling
                 * Content-only Build in Build Target on Developer Dashboard. In general, this should be true, unless you are doing something
                 * something like an asset bundle only build or unit test only build without generating an actual build artifact.
                 */
                export?: boolean;
              };
              playerSettings?: {
                Android?: {
                  /**
                   * break up android apk into an installable apk and expansion files
                   */
                  useAPKExpansionFiles?: boolean;
                };
              };
              editorUserBuildSettings?: {
                /**
                 * which android build system to build with (android only, supported in Unity 5.5+)
                 */
                androidBuildSystem?: "internal" | "gradle";
              };
              assetBundles?: {
                /**
                 * enable asset bundle builds for this target
                 */
                buildBundles?: boolean;
                /**
                 * base path relative to Assets folder where asset bundles are output. Default is 'AssetBundles'
                 */
                basePath?: string;
                /**
                 * comma separated list of flags from BuildAssetBundleOptions. see https://docs.unity3d.com/ScriptReference/BuildAssetBundleOptions.html
                 */
                buildAssetBundleOptions?: string;
                /**
                 * copy bundles to streaming assets folder, which will be packaged into the exported player.
                 */
                copyToStreamingAssets?: boolean;
                /**
                 * array of patterns to match (C# Regular Expressions) when copying asset bundle files. By default, all bundles will be copied.
                 */
                copyBundlePatterns?: string[];
              };
              addressables?: {
                /**
                 * enable addressable builds for this target
                 */
                buildAddressables?: boolean;
                /**
                 * Update a previously built player with new Addressable Content.
                 */
                contentUpdate?: boolean;
                /**
                 * which addressables profile should be used for the build
                 */
                profileName?: string;
                /**
                 * Exit and mark the build as failed if an error occurs when addressables are built
                 */
                failedAddressablesFailsBuild?: boolean;
                contentUpdateSettings?: {
                  /**
                   * The path to a Content State .bin file relative to the project root
                   */
                  contentStatePath?: string;
                  /**
                   * The Id of the build target to obtain a Content State .bin file from
                   */
                  linkedTargetId?: string;
                };
              };
              /**
               * Run any unit tests your project has when a build happens.
               */
              runUnitTests?: boolean;
              /**
               * Should Edit Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runEditModeTests?: boolean;
              /**
               * Should Play Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runPlayModeTests?: boolean;
              /**
               * Mark builds as failed if the unit tests do not pass.
               */
              failedUnitTestFailsBuild?: boolean;
              /**
               * LEGACY - The Unity method to call when running unit tests (only supported in Unity 5.2 and lower).
               */
              unitTestMethod?: string;
              /**
               * Enable lightmap baking (disabled by default since it is very slow and usually unnecessary)
               */
              enableLightBake?: boolean;
            };
          };
        };
        credentials?: {
          signing?: {
            credentialid?: string;
          };
        };
      }
    }
    namespace Responses {
      export interface $200 {
        name?: string;
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        /**
         * unique id auto-generated from the build target name
         */
        buildtargetid?: string;
        /**
         * whether this target can be built by the API
         */
        enabled?: boolean;
        settings?: {
          /**
           * start builds automatically when your repo is updated
           */
          autoBuild?: boolean;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * attempt to automatically detect which unity version to use, fallback to specified unityVersion if unable to.
           */
          autoDetectUnityVersion?: boolean;
          /**
           * attempt to get a similar unity patch version to use, applies to unavailable auto-detected Unity versions only.
           */
          fallbackPatchVersion?: boolean;
          executablename?: string;
          scm?: {
            type?: "git" | "svn" | "p4" | "hg" | "collab" | "oauth" | "plastic";
            /**
             * Which repo to use. Only applies to Plastic SCM, other SCM types configure repo on the project level.
             */
            repo?: string;
            branch?: string;
            /**
             * subdirectory to build from
             */
            subdirectory?: string;
            /**
             * perforce only client workspace to build from
             */
            client?: string;
          };
          platform?: {
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * 'latest' or a supported xcode version (ex. 'xcode7')
             */
            xcodeVersion?: string;
          };
          /**
           * For Scheduling builds
           */
          buildSchedule?: {
            isEnabled?: boolean;
            date?: string; // date-time
            repeatCycle?: "none" | "once" | "daily" | "weekly" | "monthly" | "yearly";
            cleanBuild?: boolean;
          };
          autoBuildCancellation?: boolean;
          gcpBetaOptIn?: boolean;
          gcpOptOut?: boolean;
          advanced?: {
            xcode?: {
              useArchiveAndExport?: boolean;
              /**
               * The path (including file name) from the project root to the custom FastLane configuration json file to configure multiple provisioning files, or customize the FastLane build process.
               * See https://forum.unity.com/threads/xcode-9-multiple-provisioning-profiles.545121/
               * Will look for Assets/ucb_xcode_fastlane.json by default, if not specified.
               */
              customFastlaneConfigPath?: string;
              /**
               * Only used with OSX targets, this triggers signing and notarization process for the executable.
               */
              shouldNotarize?: boolean;
            };
            android?: {
              buildAppBundle?: boolean;
              buildAssetPacks?: boolean;
            };
            unity?: {
              /**
               * The fully-qualified name of a public static method you want us to call before we start the Unity build process.
               * For example: ClassName.NeatMethod or NameSpace.ClassName.NeatMethod.
               * No trailing parenthesis, and it can't have the same name as your Post-Export method!
               */
              preExportMethod?: string;
              /**
               * The fully-qualified name of a public static method you want us to call after we finish the Unity build process
               * (but before Xcode). For example: ClassName.CoolMethod or NameSpace.ClassName.CoolMethod. No trailing parenthesis,
               * and it can't have the same name as your Post-Export method! This method must accept a string parameter, which
               * will receive the path to the exported Unity player (or Xcode project in the case of iOS).
               */
              postExportMethod?: string;
              /**
               * Relative path to the script that should be run before the build process starts.
               */
              preBuildScript?: string;
              /**
               * Relative path to the script that should be run after the build process finishes.
               */
              postBuildScript?: string;
              /**
               * If this is true, a non-zero exit code on your preBuildScript will cause your build to be marked as Failed
               */
              preBuildScriptFailsBuild?: boolean;
              /**
               * If this is true, a non-zero exit code on your postBuildScript will cause your build to be marked as Failed
               */
              postBuildScriptFailsBuild?: boolean;
              /**
               * Enter the names of the symbols you want to define for iOS. These symbols can then be used as the conditions
               * for #if directives just like the built-in ones. (i.e. #IF MYDEFINE or #IF AMAZON)
               */
              scriptingDefineSymbols?: string;
              playerExporter?: {
                /**
                 * A list of scenes to build overriding those specified in the Build Settings menu of your Unity project.
                 */
                sceneList?: string[];
                /**
                 * Unity Editor build options. Use BuildOptions.Development and BuildOptions.AllowDebugging to create a development build.
                 */
                buildOptions?: string[];
                /**
                 * Enable exporting a player from Unity (i.e. running BuildPipeline.BuildPlayer). Enabling this is equivalent to disabling
                 * Content-only Build in Build Target on Developer Dashboard. In general, this should be true, unless you are doing something
                 * something like an asset bundle only build or unit test only build without generating an actual build artifact.
                 */
                export?: boolean;
              };
              playerSettings?: {
                Android?: {
                  /**
                   * break up android apk into an installable apk and expansion files
                   */
                  useAPKExpansionFiles?: boolean;
                };
              };
              editorUserBuildSettings?: {
                /**
                 * which android build system to build with (android only, supported in Unity 5.5+)
                 */
                androidBuildSystem?: "internal" | "gradle";
              };
              assetBundles?: {
                /**
                 * enable asset bundle builds for this target
                 */
                buildBundles?: boolean;
                /**
                 * base path relative to Assets folder where asset bundles are output. Default is 'AssetBundles'
                 */
                basePath?: string;
                /**
                 * comma separated list of flags from BuildAssetBundleOptions. see https://docs.unity3d.com/ScriptReference/BuildAssetBundleOptions.html
                 */
                buildAssetBundleOptions?: string;
                /**
                 * copy bundles to streaming assets folder, which will be packaged into the exported player.
                 */
                copyToStreamingAssets?: boolean;
                /**
                 * array of patterns to match (C# Regular Expressions) when copying asset bundle files. By default, all bundles will be copied.
                 */
                copyBundlePatterns?: string[];
              };
              addressables?: {
                /**
                 * enable addressable builds for this target
                 */
                buildAddressables?: boolean;
                /**
                 * Update a previously built player with new Addressable Content.
                 */
                contentUpdate?: boolean;
                /**
                 * which addressables profile should be used for the build
                 */
                profileName?: string;
                /**
                 * Exit and mark the build as failed if an error occurs when addressables are built
                 */
                failedAddressablesFailsBuild?: boolean;
                contentUpdateSettings?: {
                  /**
                   * The path to a Content State .bin file relative to the project root
                   */
                  contentStatePath?: string;
                  /**
                   * The Id of the build target to obtain a Content State .bin file from
                   */
                  linkedTargetId?: string;
                };
              };
              /**
               * Run any unit tests your project has when a build happens.
               */
              runUnitTests?: boolean;
              /**
               * Should Edit Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runEditModeTests?: boolean;
              /**
               * Should Play Mode unit tests be run? NOTE: requires runUnitTests to be true and building
               * with Unity 5.6 or newer.
               */
              runPlayModeTests?: boolean;
              /**
               * Mark builds as failed if the unit tests do not pass.
               */
              failedUnitTestFailsBuild?: boolean;
              /**
               * LEGACY - The Unity method to call when running unit tests (only supported in Unity 5.2 and lower).
               */
              unitTestMethod?: string;
              /**
               * Enable lightmap baking (disabled by default since it is very slow and usually unnecessary)
               */
              enableLightBake?: boolean;
            };
          };
        };
        lastBuilt?: {
          /**
           * Last Unity version built by this target. Setting this has no effect.
           */
          unityVersion?: string;
        };
        credentials?: {
          signing?: {
            credentialid?: string;
            credentialResourceRef?: {
              platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
              label?: string;
              credentialid?: string;
              created?: string;
              lastMod?: string;
              certificate?: {
                /**
                 * generated team id from Apple
                 */
                teamId?: string;
                /**
                 * certificate name (from the certificate)
                 */
                certName?: string;
                /**
                 * expiration date
                 */
                expiration?: string;
                /**
                 * if this is a distribution certificate
                 */
                isDistribution?: boolean;
                /**
                 * issuer of the certificate
                 */
                issuer?: string;
                /**
                 * uploaded date
                 */
                uploaded?: string;
              };
              provisioningProfile?: {
                /**
                 * generated team id from Apple
                 */
                teamId?: string;
                /**
                 * a unique identifier (com.example.name)
                 */
                bundleId?: string;
                /**
                 * generated UUID of the profile
                 */
                uuid?: string;
                /**
                 * expiration date
                 */
                expiration?: string;
                /**
                 * is this compiled for Apple's enterprise program
                 */
                isEnterpriseProfile?: boolean;
                type?: "developer" | "adhoc" | "appstore";
                /**
                 * number of devices provisioned for this certificate
                 */
                numDevices?: number;
                /**
                 * uploaded date
                 */
                uploaded?: string;
              };
              keystore?: {
                /**
                 * friendly name for keystore
                 */
                alias?: string;
                /**
                 * whether this is a debug or production keystore
                 */
                debug?: boolean;
                /**
                 * expiration date
                 */
                expiration?: string;
              };
              links?: {
              };
            };
          };
        };
        builds?: {
          build?: number;
          /**
           * unique id auto-generated from the build target name
           */
          buildtargetid?: string;
          buildTargetName?: string;
          /**
           * unique GUID identifying this build
           */
          buildGUID?: string;
          buildStatus?: "queued" | "sentToBuilder" | "started" | "restarted" | "success" | "failure" | "canceled" | "unknown";
          /**
           * if the build was built without using data cached from previous builds
           */
          cleanBuild?: boolean;
          /**
           * list of failure details for this build attempt, when available
           */
          failureDetails?: {
            label?: string;
            resolutionHint?: string;
            stages?: string[];
            failureType?: string;
            count?: number;
          }[];
          canceledBy?: "api" | "service" | "service-timelimit" | "concurrency-timelimit" | "restart-limit" | "evaluation-timelimit" | "jenkins-timelimit";
          platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
          /**
           * size of workspace in bytes
           */
          workspaceSize?: number;
          /**
           * when the build was created
           */
          created?: string;
          /**
           * when the build completely finished
           */
          finished?: string;
          /**
           * when the build starting checking out code
           */
          checkoutStartTime?: string;
          /**
           * amount of time spent checking out code
           */
          checkoutTimeInSeconds?: number;
          /**
           * when the build started compiling
           */
          buildStartTime?: string;
          /**
           * amount of time spend compiling
           */
          buildTimeInSeconds?: number;
          /**
           * when the build started saving build artifacts
           */
          publishStartTime?: string;
          /**
           * amount of time spent saving build artifacts
           */
          publishTimeInSeconds?: number;
          /**
           * total time for the build
           */
          totalTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          unitTestTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          editModeTestTimeInSeconds?: number;
          /**
           * total time for unit test execution step
           */
          playModeTestTimeInSeconds?: number;
          /**
           * source control commit id for the build
           */
          lastBuiltRevision?: string;
          /**
           * a list of source control changes between this and the last build
           */
          changeset?: {
          }[];
          /**
           * if the build is marked as do not delete or not
           */
          favorited?: boolean;
          /**
           * description given when a build is favorited
           */
          label?: string;
          /**
           * if the build is deleted or not
           */
          deleted?: boolean;
          /**
           * if the build was built to run in linux headless mode
           */
          headless?: any;
          /**
           * if a newer credential has been attached to this buildtarget and the build can be re-signed
           */
          credentialsOutdated?: boolean;
          /**
           * email address of the user who deleted this attempt
           */
          deletedBy?: string;
          /**
           * reason the build is currently waiting
           */
          queuedReason?: "targetConcurrency" | "cooldown" | "buildConcurrency" | "waitingForBuildAgent" | "evaluating" | "sentToBuilder" | "notPending";
          /**
           * time until this build will be reconsidered for building
           */
          cooldownDate?: string;
          /**
           * scm branch to be built
           */
          scmBranch?: string;
          /**
           * 'latest' or a unity dot version with underscores (ex. '4_6_5')
           */
          unityVersion?: string;
          /**
           * 'latest' or a supported xcode version (ex. 'xcode7')
           */
          xcodeVersion?: string;
          auditChanges?: number;
          projectVersion?: {
            /**
             * automatically generated name for the build
             */
            name?: string;
            /**
             * filename for the primary artifact
             */
            filename?: string;
            /**
             * name of the project
             */
            projectName?: string;
            platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
            /**
             * size of the the primary build artifact in bytes
             */
            size?: number;
            /**
             * creation date
             */
            created?: string;
            /**
             * last modified date
             */
            lastMod?: string;
            /**
             * a unique identifier (com.example.name)
             */
            bundleId?: string;
            /**
             * iPhone unique identifiers that are able to install this build
             */
            udids?: string[];
            /**
             * links to build artifacts
             */
            links?: {
            };
          };
          projectName?: string;
          projectId?: string;
          projectGuid?: string;
          orgId?: string;
          orgFk?: string;
          filetoken?: string;
          links?: {
            [name: string]: {
              href?: string;
              method?: string;
              meta?: {
              };
            };
          };
          buildReport?: {
            errors?: number;
            warnings?: number;
          };
          /**
           * results from the build's unit tests, if any
           */
          testResults?: {
            unit_test?: {
            };
            unit_test_editmode?: {
            };
            unit_test_playmode?: {
            };
          };
          error?: string;
        }[];
        links?: {
        };
      }
    }
  }
  namespace UpdateHookForOrg {
    export interface BodyParameters {
      options?: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
      }
    }
    namespace Responses {
      export interface $200 {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
        id?: string;
      }
    }
  }
  namespace UpdateHookForProject {
    export interface BodyParameters {
      options?: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
      }
    }
    namespace Responses {
      export interface $200 {
        hookType: "web" | "slack";
        events?: ("ProjectBuildQueued" | "ProjectBuildStarted" | "ProjectBuildRestarted" | "ProjectBuildSuccess" | "ProjectBuildFailure" | "ProjectBuildCanceled" | "ProjectBuildUpload")[];
        config: {
        };
        active?: boolean;
        id?: string;
      }
    }
  }
  namespace UpdateIos {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * certificate name (from the certificate)
           */
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * if this is a distribution certificate
           */
          isDistribution?: boolean;
          /**
           * issuer of the certificate
           */
          issuer?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        provisioningProfile?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * is this compiled for Apple's enterprise program
           */
          isEnterpriseProfile?: boolean;
          type?: "developer" | "adhoc" | "appstore";
          /**
           * number of devices provisioned for this certificate
           */
          numDevices?: number;
          /**
           * uploaded date
           */
          uploaded?: string;
          /**
           * provisoned udids
           */
          provisionedDevices?: string[];
        };
        links?: {
        };
      }
    }
  }
  namespace UpdateIosForOrg {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * certificate name (from the certificate)
           */
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * if this is a distribution certificate
           */
          isDistribution?: boolean;
          /**
           * issuer of the certificate
           */
          issuer?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        provisioningProfile?: {
          /**
           * generated team id from Apple
           */
          teamId?: string;
          /**
           * a unique identifier (com.example.name)
           */
          bundleId?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * is this compiled for Apple's enterprise program
           */
          isEnterpriseProfile?: boolean;
          type?: "developer" | "adhoc" | "appstore";
          /**
           * number of devices provisioned for this certificate
           */
          numDevices?: number;
          /**
           * uploaded date
           */
          uploaded?: string;
          /**
           * provisoned udids
           */
          provisionedDevices?: string[];
        };
        links?: {
        };
      }
    }
  }
  namespace UpdateOsx {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        providerName?: string;
        appleIdUsername?: string;
        links?: {
        };
      }
    }
  }
  namespace UpdateOsxForOrg {
    namespace Responses {
      export interface $200 {
        platform?: "ios" | "android" | "webplayer" | "webgl" | "standaloneosxintel" | "standaloneosxintel64" | "standaloneosxuniversal" | "standalonewindows" | "standalonewindows64" | "standalonelinux" | "standalonelinux64" | "standalonelinuxuniversal" | "cloudrendering";
        label?: string;
        credentialid?: string;
        created?: string;
        lastMod?: string;
        certificate?: {
          certName?: string;
          /**
           * expiration date
           */
          expiration?: string;
          /**
           * uploaded date
           */
          uploaded?: string;
        };
        providerName?: string;
        appleIdUsername?: string;
        links?: {
        };
      }
    }
  }
  namespace UpdateProject {
    export interface BodyParameters {
      options: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        name?: string;
        disabled?: boolean;
        disableNotifications?: boolean;
        generateShareLinks?: boolean;
        settings?: {
          remoteCacheStrategy?: "none" | "library" | "workspace";
          scm?: {
          };
        };
      }
    }
    namespace Responses {
      export interface $200 {
        name?: string;
        projectid?: string;
        orgName?: string;
        orgid?: string;
        orgFk?: string;
        guid?: string;
        created?: string;
        cachedIcon?: string;
        serviceFlags?: {
        };
        links?: {
        };
        disabled?: boolean;
        disableNotifications?: boolean;
        generateShareLinks?: boolean;
        settings?: {
          remoteCacheStrategy?: "none" | "library" | "workspace";
          scm?: {
          };
        };
      }
    }
  }
  namespace UpdateUserSelf {
    export interface BodyParameters {
      options?: Parameters.Options;
    }
    namespace Parameters {
      export interface Options {
        /**
         * when true build status email notifications will no longer be sent
         */
        disableNotifications?: boolean;
      }
    }
    namespace Responses {
      export interface $200 {
        /**
         * email address
         */
        email?: string;
        /**
         * full name
         */
        name?: string;
        /**
         * internal unity id that is shared across services
         */
        unityid?: string;
        /**
         * when true the user is waiting to be approved for access to Cloud Build
         */
        waiting?: boolean;
        /**
         * when true build status email notifications will no longer be sent
         */
        disableNotifications?: boolean;
        /**
         * primary organization the user belongs to
         */
        primaryOrg?: string;
        /**
         * links for retrieving more information about the user
         */
        links?: {
        };
      }
    }
  }
}

export interface OperationMethods {
  /**
   * getChangeLogs - Get the Unity Cloud Build changelogs
   * 
   * Retrieves all changelog lines
   * 
   */
  'getChangeLogs'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetChangeLogs.Responses.$200>
  /**
   * listUnityVersions - List all unity versions
   */
  'listUnityVersions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListUnityVersions.Responses.$200>
  /**
   * getVersion - Get a unity version by value
   */
  'getVersion'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetVersion.Responses.$200>
  /**
   * listXcodeVersions - List all xcode versions
   */
  'listXcodeVersions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListXcodeVersions.Responses.$200>
  /**
   * listScmsSupportingVersionAutoDetect - List all SCM types supporting auto detecting the project Unity version
   */
  'listScmsSupportingVersionAutoDetect'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListScmsSupportingVersionAutoDetect.Responses.$200>
  /**
   * getUserSelf - Get current user
   * 
   * Get the currently authenticated user.
   */
  'getUserSelf'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserSelf.Responses.$200>
  /**
   * updateUserSelf - Update current user
   * 
   * You can update a few fields on the current user. Each field is optional and you
   * do not need to specify all fields on update.
   */
  'updateUserSelf'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUserSelf.Responses.$200>
  /**
   * getUserApiKey - Get current user's API key
   * 
   * Get the currently authenticated user's API key.
   */
  'getUserApiKey'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserApiKey.Responses.$200>
  /**
   * regenApiKey - Regenerate API Key
   * 
   * Remove current API key and generate a new one. *WARNING* you will need to use the returned
   * API key in all subsequent calls.
   */
  'regenApiKey'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RegenApiKey.Responses.$200>
  /**
   * listDevicesForUser - List iOS device profiles
   * 
   * List all iOS device profiles for the current user
   */
  'listDevicesForUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListDevicesForUser.Responses.$200>
  /**
   * createDevice - Create iOS device profile
   * 
   * Create iOS device profile for the current user
   */
  'createDevice'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateDevice.Responses.$201 | Paths.CreateDevice.Responses.$400>
  /**
   * getBillingPlans - Get billing plan
   * 
   * Get the billing plan for the specified organization
   */
  'getBillingPlans'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBillingPlans.Responses.$200>
  /**
   * listHooksForOrg - List hooks for organization
   * 
   * List all hooks configured for the specified organization
   */
  'listHooksForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListHooksForOrg.Responses.$200>
  /**
   * addHookForOrg - Add hook for organization
   * 
   * Adds a new organization level hook. An organization level hook is triggered by events from all projects
   * belonging to the organziation. NOTE: you must be a manager in the organization to add new hooks.
   * <h4>Hook Type Configuration Parameters</h4>
   * <div class="webhook-tag-desc">
   * <table>
   * <tr><th>Type</th><th>Configuration Options</th></tr>
   * <tr>
   *    <td><code>web</code>
   *    <td>
   *       <table>
   *          <tr><th>url</th><td>Endpoint to submit POST request</td></tr>
   *          <tr><th>encoding</th><td>Either <code>json</code> (default) or <code>form</code></td></tr>
   *          <tr><th>sslVerify</th><td>Verify SSL certificates of HTTPS endpoint</td></tr>
   *          <tr><th>secret</th><td>Used to compute the SHA256 HMAC signature of the hook body and adds
   *          a <code>X-UnityCloudBuild-Signature</code> header to the payload</td></tr>
   *       </table>
   *    </td>
   * </tr>
   * <tr>
   *    <td><code>slack</code>
   *    <td>
   *       <table>
   *          <tr><th>url</th><td>Slack incoming webhook URL. Learn more at https://api.slack.com/incoming-webhooks</td></tr>
   *       </table>
   *    </td>
   * </tr>
   * </table>
   * </div>
   * 
   */
  'addHookForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddHookForOrg.Responses.$201>
  /**
   * getHookForOrg - Get organization hook details
   * 
   * Get details of a hook by id
   */
  'getHookForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetHookForOrg.Responses.$200>
  /**
   * updateHookForOrg - Update hook for organization
   * 
   * Update a new hook. NOTE: you must be a manager in the
   * organization to update hooks.
   * 
   */
  'updateHookForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateHookForOrg.Responses.$200>
  /**
   * deleteHookForOrg - Delete organization hook
   */
  'deleteHookForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteHookForOrg.Responses.$204>
  /**
   * pingHookForOrg - Ping an org hook
   * 
   * Send a ping event to an org hook.
   * 
   */
  'pingHookForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PingHookForOrg.Responses.$204>
  /**
   * getSSHKeyForOrg - Get SSH Key
   * 
   * Get the ssh public key for the specified org
   */
  'getSSHKeyForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSSHKeyForOrg.Responses.$200>
  /**
   * regenerateSSHKey - Regenerate SSH Key
   * 
   * Regenerate the ssh key for the specified org
   * *WARNING* this is a destructive operation that will permanently remove your current SSH key.
   */
  'regenerateSSHKey'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RegenerateSSHKey.Responses.$201>
  /**
   * listProjectsForUser - List all projects (user)
   * 
   * List all projects that you have permission to access across all organizations. Add "?include=settings"
   * as a query parameter to include the project settings with the response.
   * 
   */
  'listProjectsForUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectsForUser.Responses.$200>
  /**
   * getProjectByUpid - Get project details
   * 
   * Gets the same data as /orgs/{orgid}/project/{projectid} but looks up the project by the Unity Project ID. This
   * value is returned in the project's guid field.
   */
  'getProjectByUpid'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProjectByUpid.Responses.$200>
  /**
   * listProjectsForOrg - List all projects (org)
   * 
   * List all projects that belong to the specified organization. Add "?include=settings"
   * as a query parameter to include the project settings with the response.
   * 
   */
  'listProjectsForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListProjectsForOrg.Responses.$200>
  /**
   * addProject - Create project
   * 
   * Create a project for the specified organization
   */
  'addProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddProject.Responses.$201>
  /**
   * getProject - Get project details
   */
  'getProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetProject.Responses.$200>
  /**
   * updateProject - Update project details
   */
  'updateProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateProject.Responses.$200>
  /**
   * archiveProject - Archive project
   * 
   * This will archive the project in Cloud Build ONLY. Use with caution - this process is not reversible.
   * The projects UPID will be removed from Cloud Build allowing the project to be reconfigured.
   */
  'archiveProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ArchiveProject.Responses.$204 | Paths.ArchiveProject.Responses.$404>
  /**
   * getBillingPlansForProject - Get billing plan
   * 
   * Get the billing plan for the specified project
   */
  'getBillingPlansForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBillingPlansForProject.Responses.$200>
  /**
   * getSSHKeyForProject - Get SSH Key
   * 
   * Get the ssh public key for the specified project
   */
  'getSSHKeyForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSSHKeyForProject.Responses.$200>
  /**
   * getStatsForProject - Get project statistics
   * 
   * Get statistics for the specified project
   */
  'getStatsForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStatsForProject.Responses.$200>
  /**
   * getAuditLogForProject - Get audit log
   * 
   * Retrieve a list of historical settings changes for this project
   */
  'getAuditLogForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAuditLogForProject.Responses.$200>
  /**
   * listHooksForProject - List hooks for project
   * 
   * List all hooks configured for the specified project
   */
  'listHooksForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListHooksForProject.Responses.$200>
  /**
   * addHookForProject - Add hook for project
   * 
   * Adds a new project level hook. A project level hook is only triggered by events from the specific project.
   * NOTE: you must be a manager in the organization to add new hooks.
   * <h4>Hook Type Configuration Parameters</h4>
   * <div class="webhook-tag-desc">
   * <table>
   * <tr><th>Type</th><th>Configuration Options</th></tr>
   * <tr>
   *    <td><code>web</code>
   *    <td>
   *       <table>
   *          <tr><th>url</th><td>Endpoint to submit POST request</td></tr>
   *          <tr><th>encoding</th><td>Either <code>json</code> (default) or <code>form</code></td></tr>
   *          <tr><th>sslVerify</th><td>Verify SSL certificates of HTTPS endpoint</td></tr>
   *          <tr><th>secret</th><td>Used to compute the SHA256 HMAC signature of the hook body and adds
   *          a <code>X-UnityCloudBuild-Signature</code> header to the payload</td></tr>
   *       </table>
   *    </td>
   * </tr>
   * <tr>
   *    <td><code>slack</code>
   *    <td>
   *       <table>
   *          <tr><th>url</th><td>Slack incoming webhook URL. Learn more at https://api.slack.com/incoming-webhooks</td></tr>
   *       </table>
   *    </td>
   * </tr>
   * </table>
   * </div>
   * 
   */
  'addHookForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddHookForProject.Responses.$201>
  /**
   * getHookForProject - Get project hook details
   * 
   * Get details of a hook by id
   */
  'getHookForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetHookForProject.Responses.$200>
  /**
   * updateHookForProject - Update hook for project
   * 
   * Update an existing hook. NOTE: you must be a manager of the
   * project to update hooks.
   * 
   */
  'updateHookForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateHookForProject.Responses.$200>
  /**
   * deleteHookForProject - Delete project hook
   */
  'deleteHookForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteHookForProject.Responses.$204>
  /**
   * pingHookForProject - Ping a project hook
   * 
   * Send a ping event to a project hook.
   * 
   */
  'pingHookForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PingHookForProject.Responses.$204>
  /**
   * getEnvVariablesForProject - Get environment variables
   * 
   * Get all configured environment variables for a given project
   */
  'getEnvVariablesForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEnvVariablesForProject.Responses.$200>
  /**
   * setEnvVariablesForProject - Set environment variables
   * 
   * Set all configured environment variables for a given project
   */
  'setEnvVariablesForProject'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetEnvVariablesForProject.Responses.$200>
  /**
   * getBuildTargets - List all build targets for a project
   * 
   * Gets all configured build targets for a project, regardless of whether they are enabled. Add "?include=settings,credentials"
   * as a query parameter to include the build target settings and credentials with the response.
   * 
   */
  'getBuildTargets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBuildTargets.Responses.$200>
  /**
   * addBuildTarget - Create build target for a project
   */
  'addBuildTarget'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddBuildTarget.Responses.$201>
  /**
   * getBuildTarget - Get a build target
   */
  'getBuildTarget'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBuildTarget.Responses.$200>
  /**
   * updateBuildTarget - Update build target details
   */
  'updateBuildTarget'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBuildTarget.Responses.$200>
  /**
   * deleteBuildTarget - Delete build target
   */
  'deleteBuildTarget'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBuildTarget.Responses.$204>
  /**
   * getEnvVariablesForBuildTarget - Get environment variables
   * 
   * Get all configured environment variables for a given build target
   */
  'getEnvVariablesForBuildTarget'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEnvVariablesForBuildTarget.Responses.$200>
  /**
   * setEnvVariablesForBuildTarget - Set environment variables
   * 
   * Set all configured environment variables for a given build target
   */
  'setEnvVariablesForBuildTarget'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetEnvVariablesForBuildTarget.Responses.$200>
  /**
   * getAuditLogForBuildTarget - Get audit log
   * 
   * Retrieve a list of historical settings changes for this build target.
   */
  'getAuditLogForBuildTarget'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAuditLogForBuildTarget.Responses.$200>
  /**
   * getStatsForBuildTarget - Get build target statistics
   * 
   * Get statistics for the specified build target
   */
  'getStatsForBuildTarget'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStatsForBuildTarget.Responses.$200>
  /**
   * getBuildTargetsForOrg - List all build targets for an org
   * 
   * Gets all configured build targets for an org, regardless of whether they are enabled. Add "?include=settings,credentials"
   * as a query parameter to include the build target settings and credentials with the response.
   * 
   */
  'getBuildTargetsForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBuildTargetsForOrg.Responses.$200>
  /**
   * getAllAndroidForOrg - Get All Android Credentials for an organization
   * 
   * Get all credentials available for the organization. A list of
   * projects using a credential is included in the links element.
   * 
   */
  'getAllAndroidForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllAndroidForOrg.Responses.$200>
  /**
   * addCredentialsAndroidForOrg - Upload Android Credentials
   * 
   * Upload a new android keystore for an organization. NOTE: you must
   * be a manager in the organization to add new credentials.
   * 
   */
  'addCredentialsAndroidForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddCredentialsAndroidForOrg.Responses.$201>
  /**
   * getOneAndroidForOrg - Get Android Credential Details for organization
   * 
   * Get specific organization android credential details
   */
  'getOneAndroidForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOneAndroidForOrg.Responses.$200>
  /**
   * updateAndroidForOrg - Update Android Credentials for organization
   * 
   * Update an android keystore for the organization. NOTE: you must
   * be a manager in the organization to update credentials.
   * 
   */
  'updateAndroidForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateAndroidForOrg.Responses.$200>
  /**
   * deleteAndroidForOrg - Delete Android Credentials for organization
   * 
   * Delete specific android credentials for an organization. NOTE:
   * you must be a manager in the organization to
   * delete credentials.
   * 
   */
  'deleteAndroidForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteAndroidForOrg.Responses.$204>
  /**
   * getAllAndroid - Get All Android Credentials
   * 
   * Get all credentials available for the project. A user in the
   * projects org will see all credentials uploaded for any project
   * within the org, whereas a user with project-level permissions
   * will only see credentials assigned to the specific project.
   * 
   */
  'getAllAndroid'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllAndroid.Responses.$200>
  /**
   * addCredentialsAndroid - Upload Android Credentials
   * 
   * Upload a new android keystore for the project. NOTE: you must
   * be a manager in the project's organization to add new credentials.
   * 
   */
  'addCredentialsAndroid'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddCredentialsAndroid.Responses.$201>
  /**
   * getOneAndroid - Get Android Credential Details
   * 
   * Get specific android credential details
   */
  'getOneAndroid'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOneAndroid.Responses.$200>
  /**
   * updateAndroid - Update Android Credentials
   * 
   * Update an android keystore for the project. NOTE: you must
   * be a manager in the project's organization to add new credentials.
   * 
   */
  'updateAndroid'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateAndroid.Responses.$200>
  /**
   * deleteAndroid - Delete Android Credentials
   * 
   * Delete specific android credentials for a project. NOTE:
   * you must be a manager in the project's organization to
   * delete credentials.
   * 
   */
  'deleteAndroid'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteAndroid.Responses.$204>
  /**
   * getAllIosForOrg - Get All iOS Credentials for an oganization
   * 
   * Get all credentials available for the project. A user in the
   * projects org will see all credentials uploaded for any project
   * within the org, whereas a user with project-level permissions
   * will only see credentials assigned to the specific project.
   * 
   */
  'getAllIosForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllIosForOrg.Responses.$200>
  /**
   * addCredentialsIosForOrg - Upload iOS Credentials for organization
   * 
   * Upload a new iOS certificate and provisioning profile for the organization.
   * NOTE: you must be a manager in the organization to add new
   * credentials.
   * 
   */
  'addCredentialsIosForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddCredentialsIosForOrg.Responses.$201>
  /**
   * getOneIosForOrg - Get iOS Credential Details for organization
   * 
   * Get specific iOS credential details
   */
  'getOneIosForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOneIosForOrg.Responses.$200>
  /**
   * updateIosForOrg - Update iOS Credentials for organization
   * 
   * Update an iOS certificate / provisioning profile.
   * NOTE: you must be a manager in the project's organization to update
   * credentials.
   * 
   */
  'updateIosForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateIosForOrg.Responses.$200>
  /**
   * deleteIosForOrg - Delete iOS Credentials for organization
   * 
   * Delete specific ios credentials. NOTE:
   * you must be a manager in the project's organization to
   * delete credentials.
   * 
   */
  'deleteIosForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteIosForOrg.Responses.$204>
  /**
   * getAllIos - Get All iOS Credentials
   * 
   * Get all credentials available for the project. A user in the
   * projects org will see all credentials uploaded for any project
   * within the org, whereas a user with project-level permissions
   * will only see credentials assigned to the specific project.
   * 
   */
  'getAllIos'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllIos.Responses.$200>
  /**
   * addCredentialsIos - Upload iOS Credentials
   * 
   * Upload a new iOS certificate and provisioning profile for the project.
   * NOTE: you must be a manager in the project's organization to add new
   * credentials.
   * 
   */
  'addCredentialsIos'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddCredentialsIos.Responses.$201>
  /**
   * getOneIos - Get iOS Credential Details
   * 
   * Get specific iOS credential details
   */
  'getOneIos'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOneIos.Responses.$200>
  /**
   * updateIos - Update iOS Credentials
   * 
   * Update an iOS certificate / provisioning profile for the project.
   * NOTE: you must be a manager in the project's organization to update
   * credentials.
   * 
   */
  'updateIos'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateIos.Responses.$200>
  /**
   * deleteIos - Delete iOS Credentials
   * 
   * Delete specific ios credentials for a project. NOTE:
   * you must be a manager in the project's organization to
   * delete credentials.
   * 
   */
  'deleteIos'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteIos.Responses.$204>
  /**
   * getAllOsxForOrg - Get All OSX Credentials for an oganization
   * 
   * Get all credentials available for the project. A user in the
   * projects org will see all credentials uploaded for any project
   * within the org, whereas a user with project-level permissions
   * will only see credentials assigned to the specific project.
   * 
   */
  'getAllOsxForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllOsxForOrg.Responses.$200>
  /**
   * addCredentialsOsxForOrg - Upload OSX Credentials for organization
   * 
   * Upload a new OSX certificate and provisioning profile for the organization.
   * NOTE: you must be a manager in the organization to add new
   * credentials.
   * 
   */
  'addCredentialsOsxForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddCredentialsOsxForOrg.Responses.$201>
  /**
   * getOneOsxForOrg - Get OSX Credential Details for organization
   * 
   * Get specific OSX credential details
   */
  'getOneOsxForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOneOsxForOrg.Responses.$200>
  /**
   * updateOsxForOrg - Update OSX Credentials for organization
   * 
   * Update an OSX certificate / provisioning profile.
   * NOTE: you must be a manager in the project's organization to update
   * credentials.
   * 
   */
  'updateOsxForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateOsxForOrg.Responses.$200>
  /**
   * deleteOsxForOrg - Delete OSX Credentials for organization
   * 
   * Delete specific OSX credentials. NOTE:
   * you must be a manager in the project's organization to
   * delete credentials.
   * 
   */
  'deleteOsxForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteOsxForOrg.Responses.$204>
  /**
   * getAllOsx - Get All OSX Credentials
   * 
   * Get all credentials available for the project. A user in the
   * projects org will see all credentials uploaded for any project
   * within the org, whereas a user with project-level permissions
   * will only see credentials assigned to the specific project.
   * 
   */
  'getAllOsx'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllOsx.Responses.$200>
  /**
   * addCredentialsOsx - Upload OSX Credentials
   * 
   * Upload a new OSX certificate and provisioning profile for the project.
   * NOTE: you must be a manager in the project's organization to add new
   * credentials.
   * 
   */
  'addCredentialsOsx'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddCredentialsOsx.Responses.$201>
  /**
   * getOneOsx - Get OSX Credential Details
   * 
   * Get specific OSX credential details
   */
  'getOneOsx'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOneOsx.Responses.$200>
  /**
   * updateOsx - Update OSX Credentials
   * 
   * Update an OSX certificate / provisioning profile for the project.
   * NOTE: you must be a manager in the project's organization to update
   * credentials.
   * 
   */
  'updateOsx'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateOsx.Responses.$200>
  /**
   * deleteOsx - Delete OSX Credentials
   * 
   * Delete specific OSX credentials for a project. NOTE:
   * you must be a manager in the project's organization to
   * delete credentials.
   * 
   */
  'deleteOsx'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteOsx.Responses.$204>
  /**
   * deleteAllBuildArtifacts - Delete all artifacts associated with all non-favorited builds for a specified buildtargetid (_all is allowed).
   */
  'deleteAllBuildArtifacts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteAllBuildArtifacts.Responses.$204>
  /**
   * deleteBuildArtifacts - Delete all artifacts associated with a specific build
   */
  'deleteBuildArtifacts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteBuildArtifacts.Responses.$204>
  /**
   * batchDeleteBuildArtifacts - Delete artifacts for a batch of builds
   * 
   * Delete all artifacts associated with the builds identified by the
   * provided build target ids and build numbers. Builds marked as do
   * not delete or that are currently building will be ignored.
   * 
   */
  'batchDeleteBuildArtifacts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BatchDeleteBuildArtifacts.Responses.$204>
  /**
   * getBuilds - List all builds
   * 
   * List all running and finished builds, sorted by build number
   * (optionally paginating the results). Use '_all' as the buildtargetid
   * to get all configured build targets. The response includes a Content-Range
   * header that identifies the range of results returned and the total number
   * of results matching the given query parameters.
   * 
   */
  'getBuilds'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBuilds.Responses.$200>
  /**
   * startBuilds - Create new build
   * 
   * Start the build process for this build target (or all targets,
   * if '_all' is specified as the buildtargetid), if there is not one
   * currently in process.
   * 
   * If a build is currently in process that information will be related
   * in the 'error' field.
   * 
   */
  'startBuilds'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.StartBuilds.Responses.$202>
  /**
   * cancelAllBuilds - Cancel all builds
   * 
   * Cancel all builds in progress for this build target (or all targets,
   * if '_all' is specified as the buildtargetid). Canceling an already
   * finished build will do nothing and respond successfully.
   * 
   */
  'cancelAllBuilds'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelAllBuilds.Responses.$204>
  /**
   * getBuild - Build Status
   * 
   * Retrieve information for a specific build. A Build resource contains
   * information related to a build attempt for a build target, including
   * the build number, changeset, build times, and other pertinent data.
   * 
   */
  'getBuild'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBuild.Responses.$200>
  /**
   * updateBuild - Update build information
   */
  'updateBuild'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateBuild.Responses.$200>
  /**
   * cancelBuild - Cancel build
   * 
   * Cancel a build in progress. Canceling an already finished build
   * will do nothing and respond successfully.
   * 
   */
  'cancelBuild'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelBuild.Responses.$204>
  /**
   * getAuditLog - Get audit log
   * 
   * Retrieve a list of settings changes between the last and current build.
   */
  'getAuditLog'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAuditLog.Responses.$200>
  /**
   * resignBuildArtifact - Re-sign a build artifact
   * 
   * Re-sign a build artifact using the most recent credentials associated with the buildtarget.
   * 
   */
  'resignBuildArtifact'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ResignBuildArtifact.Responses.$202>
  /**
   * getBuildsForOrg - List all builds for org
   * 
   * List all running and finished builds, sorted by build number
   * (optionally paginating the results). The response includes a Content-Range
   * header that identifies the range of results returned and the total number
   * of results matching the given query parameters.
   * 
   */
  'getBuildsForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBuildsForOrg.Responses.$200>
  /**
   * cancelBuildsForOrg - Cancel builds for org
   * 
   * Cancel all in progress builds for an organization. Canceling an already finished build
   * will do nothing and respond successfully.
   * 
   */
  'cancelBuildsForOrg'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CancelBuildsForOrg.Responses.$204>
  /**
   * getBuildLog - Get build log
   * 
   * Retrieve the plain text log for a specifc build.
   */
  'getBuildLog'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBuildLog.Responses.Default>
  /**
   * getBuildSteps - Get the build steps for a given build
   * 
   * Retrieves all build steps for a build, this replaces the old method where we would manually download the
   * build report artifacts and allows us to add more functionality into build steps.
   * 
   */
  'getBuildSteps'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBuildSteps.Responses.$200>
  /**
   * getShare - Get the share link
   * 
   * Gets a share link if it exists
   */
  'getShare'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetShare.Responses.$200 | Paths.GetShare.Responses.$404>
  /**
   * modifyShare - Modify existing share link
   * 
   * Modify an existing share link. Only intended for updating the Expiry without revoking the link.
   */
  'modifyShare'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ModifyShare.Responses.$201 | Paths.ModifyShare.Responses.$404>
  /**
   * createShare - Create a new link to share a project
   * 
   * Create a new short link to share a project. If this is called when a share already exists, that share
   * will be revoked and a new one created.
   */
  'createShare'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateShare.Responses.$201 | Paths.CreateShare.Responses.$404>
  /**
   * revokeShare - Revoke a shared link
   * 
   * Revoke a shared link, both {buildtargetid} and {number} may use _all to revoke all share links for a given buildtarget or entire project.
   */
  'revokeShare'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokeShare.Responses.$204 | Paths.RevokeShare.Responses.$404>
  /**
   * getShareMetadata - Get details on shared build including download link
   * 
   * This is an endpoint accessible without an api key that provides information about a
   * specific build including download links.
   * A shareid is generated by POSTing to a <a href="#!/builds/createShare">build's share endpoint</a>.
   */
  'getShareMetadata'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetShareMetadata.Responses.$200>
  /**
   * getStatus - Get Cloud Build Status
   */
  'getStatus'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStatus.Responses.$200>
}

export interface PathsDictionary {
  ['/changelogs']: {
    /**
     * getChangeLogs - Get the Unity Cloud Build changelogs
     * 
     * Retrieves all changelog lines
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetChangeLogs.Responses.$200>
  }
  ['/versions/unity']: {
    /**
     * listUnityVersions - List all unity versions
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListUnityVersions.Responses.$200>
  }
  ['/versions/unity/{key}']: {
    /**
     * getVersion - Get a unity version by value
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetVersion.Responses.$200>
  }
  ['/versions/xcode']: {
    /**
     * listXcodeVersions - List all xcode versions
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListXcodeVersions.Responses.$200>
  }
  ['/versions/auto_detect_supported_scms']: {
    /**
     * listScmsSupportingVersionAutoDetect - List all SCM types supporting auto detecting the project Unity version
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListScmsSupportingVersionAutoDetect.Responses.$200>
  }
  ['/users/me']: {
    /**
     * getUserSelf - Get current user
     * 
     * Get the currently authenticated user.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserSelf.Responses.$200>
    /**
     * updateUserSelf - Update current user
     * 
     * You can update a few fields on the current user. Each field is optional and you
     * do not need to specify all fields on update.
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUserSelf.Responses.$200>
  }
  ['/users/me/apikey']: {
    /**
     * getUserApiKey - Get current user's API key
     * 
     * Get the currently authenticated user's API key.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserApiKey.Responses.$200>
    /**
     * regenApiKey - Regenerate API Key
     * 
     * Remove current API key and generate a new one. *WARNING* you will need to use the returned
     * API key in all subsequent calls.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RegenApiKey.Responses.$200>
  }
  ['/users/me/devices']: {
    /**
     * listDevicesForUser - List iOS device profiles
     * 
     * List all iOS device profiles for the current user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListDevicesForUser.Responses.$200>
    /**
     * createDevice - Create iOS device profile
     * 
     * Create iOS device profile for the current user
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateDevice.Responses.$201 | Paths.CreateDevice.Responses.$400>
  }
  ['/orgs/{orgid}/billingplan']: {
    /**
     * getBillingPlans - Get billing plan
     * 
     * Get the billing plan for the specified organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBillingPlans.Responses.$200>
  }
  ['/orgs/{orgid}/hooks']: {
    /**
     * listHooksForOrg - List hooks for organization
     * 
     * List all hooks configured for the specified organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListHooksForOrg.Responses.$200>
    /**
     * addHookForOrg - Add hook for organization
     * 
     * Adds a new organization level hook. An organization level hook is triggered by events from all projects
     * belonging to the organziation. NOTE: you must be a manager in the organization to add new hooks.
     * <h4>Hook Type Configuration Parameters</h4>
     * <div class="webhook-tag-desc">
     * <table>
     * <tr><th>Type</th><th>Configuration Options</th></tr>
     * <tr>
     *    <td><code>web</code>
     *    <td>
     *       <table>
     *          <tr><th>url</th><td>Endpoint to submit POST request</td></tr>
     *          <tr><th>encoding</th><td>Either <code>json</code> (default) or <code>form</code></td></tr>
     *          <tr><th>sslVerify</th><td>Verify SSL certificates of HTTPS endpoint</td></tr>
     *          <tr><th>secret</th><td>Used to compute the SHA256 HMAC signature of the hook body and adds
     *          a <code>X-UnityCloudBuild-Signature</code> header to the payload</td></tr>
     *       </table>
     *    </td>
     * </tr>
     * <tr>
     *    <td><code>slack</code>
     *    <td>
     *       <table>
     *          <tr><th>url</th><td>Slack incoming webhook URL. Learn more at https://api.slack.com/incoming-webhooks</td></tr>
     *       </table>
     *    </td>
     * </tr>
     * </table>
     * </div>
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddHookForOrg.Responses.$201>
  }
  ['/orgs/{orgid}/hooks/{id}']: {
    /**
     * getHookForOrg - Get organization hook details
     * 
     * Get details of a hook by id
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetHookForOrg.Responses.$200>
    /**
     * deleteHookForOrg - Delete organization hook
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteHookForOrg.Responses.$204>
    /**
     * updateHookForOrg - Update hook for organization
     * 
     * Update a new hook. NOTE: you must be a manager in the
     * organization to update hooks.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateHookForOrg.Responses.$200>
  }
  ['/orgs/{orgid}/hooks/{id}/ping']: {
    /**
     * pingHookForOrg - Ping an org hook
     * 
     * Send a ping event to an org hook.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PingHookForOrg.Responses.$204>
  }
  ['/orgs/{orgid}/sshkey']: {
    /**
     * getSSHKeyForOrg - Get SSH Key
     * 
     * Get the ssh public key for the specified org
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSSHKeyForOrg.Responses.$200>
    /**
     * regenerateSSHKey - Regenerate SSH Key
     * 
     * Regenerate the ssh key for the specified org
     * *WARNING* this is a destructive operation that will permanently remove your current SSH key.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RegenerateSSHKey.Responses.$201>
  }
  ['/projects']: {
    /**
     * listProjectsForUser - List all projects (user)
     * 
     * List all projects that you have permission to access across all organizations. Add "?include=settings"
     * as a query parameter to include the project settings with the response.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectsForUser.Responses.$200>
  }
  ['/projects/{projectupid}']: {
    /**
     * getProjectByUpid - Get project details
     * 
     * Gets the same data as /orgs/{orgid}/project/{projectid} but looks up the project by the Unity Project ID. This
     * value is returned in the project's guid field.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProjectByUpid.Responses.$200>
  }
  ['/orgs/{orgid}/projects']: {
    /**
     * listProjectsForOrg - List all projects (org)
     * 
     * List all projects that belong to the specified organization. Add "?include=settings"
     * as a query parameter to include the project settings with the response.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListProjectsForOrg.Responses.$200>
    /**
     * addProject - Create project
     * 
     * Create a project for the specified organization
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddProject.Responses.$201>
  }
  ['/orgs/{orgid}/projects/{projectid}']: {
    /**
     * getProject - Get project details
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetProject.Responses.$200>
    /**
     * updateProject - Update project details
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateProject.Responses.$200>
    /**
     * archiveProject - Archive project
     * 
     * This will archive the project in Cloud Build ONLY. Use with caution - this process is not reversible.
     * The projects UPID will be removed from Cloud Build allowing the project to be reconfigured.
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ArchiveProject.Responses.$204 | Paths.ArchiveProject.Responses.$404>
  }
  ['/orgs/{orgid}/projects/{projectid}/billingplan']: {
    /**
     * getBillingPlansForProject - Get billing plan
     * 
     * Get the billing plan for the specified project
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBillingPlansForProject.Responses.$200>
  }
  ['/orgs/{orgid}/projects/{projectid}/sshkey']: {
    /**
     * getSSHKeyForProject - Get SSH Key
     * 
     * Get the ssh public key for the specified project
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSSHKeyForProject.Responses.$200>
  }
  ['/orgs/{orgid}/projects/{projectid}/stats']: {
    /**
     * getStatsForProject - Get project statistics
     * 
     * Get statistics for the specified project
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStatsForProject.Responses.$200>
  }
  ['/orgs/{orgid}/projects/{projectid}/auditlog']: {
    /**
     * getAuditLogForProject - Get audit log
     * 
     * Retrieve a list of historical settings changes for this project
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAuditLogForProject.Responses.$200>
  }
  ['/orgs/{orgid}/projects/{projectid}/hooks']: {
    /**
     * listHooksForProject - List hooks for project
     * 
     * List all hooks configured for the specified project
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListHooksForProject.Responses.$200>
    /**
     * addHookForProject - Add hook for project
     * 
     * Adds a new project level hook. A project level hook is only triggered by events from the specific project.
     * NOTE: you must be a manager in the organization to add new hooks.
     * <h4>Hook Type Configuration Parameters</h4>
     * <div class="webhook-tag-desc">
     * <table>
     * <tr><th>Type</th><th>Configuration Options</th></tr>
     * <tr>
     *    <td><code>web</code>
     *    <td>
     *       <table>
     *          <tr><th>url</th><td>Endpoint to submit POST request</td></tr>
     *          <tr><th>encoding</th><td>Either <code>json</code> (default) or <code>form</code></td></tr>
     *          <tr><th>sslVerify</th><td>Verify SSL certificates of HTTPS endpoint</td></tr>
     *          <tr><th>secret</th><td>Used to compute the SHA256 HMAC signature of the hook body and adds
     *          a <code>X-UnityCloudBuild-Signature</code> header to the payload</td></tr>
     *       </table>
     *    </td>
     * </tr>
     * <tr>
     *    <td><code>slack</code>
     *    <td>
     *       <table>
     *          <tr><th>url</th><td>Slack incoming webhook URL. Learn more at https://api.slack.com/incoming-webhooks</td></tr>
     *       </table>
     *    </td>
     * </tr>
     * </table>
     * </div>
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddHookForProject.Responses.$201>
  }
  ['/orgs/{orgid}/projects/{projectid}/hooks/{id}']: {
    /**
     * getHookForProject - Get project hook details
     * 
     * Get details of a hook by id
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetHookForProject.Responses.$200>
    /**
     * deleteHookForProject - Delete project hook
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteHookForProject.Responses.$204>
    /**
     * updateHookForProject - Update hook for project
     * 
     * Update an existing hook. NOTE: you must be a manager of the
     * project to update hooks.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateHookForProject.Responses.$200>
  }
  ['/orgs/{orgid}/projects/{projectid}/hooks/{id}/ping']: {
    /**
     * pingHookForProject - Ping a project hook
     * 
     * Send a ping event to a project hook.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PingHookForProject.Responses.$204>
  }
  ['/orgs/{orgid}/projects/{projectid}/envvars']: {
    /**
     * getEnvVariablesForProject - Get environment variables
     * 
     * Get all configured environment variables for a given project
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEnvVariablesForProject.Responses.$200>
    /**
     * setEnvVariablesForProject - Set environment variables
     * 
     * Set all configured environment variables for a given project
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetEnvVariablesForProject.Responses.$200>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets']: {
    /**
     * getBuildTargets - List all build targets for a project
     * 
     * Gets all configured build targets for a project, regardless of whether they are enabled. Add "?include=settings,credentials"
     * as a query parameter to include the build target settings and credentials with the response.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBuildTargets.Responses.$200>
    /**
     * addBuildTarget - Create build target for a project
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddBuildTarget.Responses.$201>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}']: {
    /**
     * getBuildTarget - Get a build target
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBuildTarget.Responses.$200>
    /**
     * updateBuildTarget - Update build target details
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBuildTarget.Responses.$200>
    /**
     * deleteBuildTarget - Delete build target
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBuildTarget.Responses.$204>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/envvars']: {
    /**
     * getEnvVariablesForBuildTarget - Get environment variables
     * 
     * Get all configured environment variables for a given build target
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEnvVariablesForBuildTarget.Responses.$200>
    /**
     * setEnvVariablesForBuildTarget - Set environment variables
     * 
     * Set all configured environment variables for a given build target
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetEnvVariablesForBuildTarget.Responses.$200>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/auditlog']: {
    /**
     * getAuditLogForBuildTarget - Get audit log
     * 
     * Retrieve a list of historical settings changes for this build target.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAuditLogForBuildTarget.Responses.$200>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/stats']: {
    /**
     * getStatsForBuildTarget - Get build target statistics
     * 
     * Get statistics for the specified build target
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStatsForBuildTarget.Responses.$200>
  }
  ['/orgs/{orgid}/buildtargets']: {
    /**
     * getBuildTargetsForOrg - List all build targets for an org
     * 
     * Gets all configured build targets for an org, regardless of whether they are enabled. Add "?include=settings,credentials"
     * as a query parameter to include the build target settings and credentials with the response.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBuildTargetsForOrg.Responses.$200>
  }
  ['/orgs/{orgid}/credentials/signing/android']: {
    /**
     * getAllAndroidForOrg - Get All Android Credentials for an organization
     * 
     * Get all credentials available for the organization. A list of
     * projects using a credential is included in the links element.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllAndroidForOrg.Responses.$200>
    /**
     * addCredentialsAndroidForOrg - Upload Android Credentials
     * 
     * Upload a new android keystore for an organization. NOTE: you must
     * be a manager in the organization to add new credentials.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddCredentialsAndroidForOrg.Responses.$201>
  }
  ['/orgs/{orgid}/credentials/signing/android/{credentialid}']: {
    /**
     * getOneAndroidForOrg - Get Android Credential Details for organization
     * 
     * Get specific organization android credential details
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOneAndroidForOrg.Responses.$200>
    /**
     * updateAndroidForOrg - Update Android Credentials for organization
     * 
     * Update an android keystore for the organization. NOTE: you must
     * be a manager in the organization to update credentials.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateAndroidForOrg.Responses.$200>
    /**
     * deleteAndroidForOrg - Delete Android Credentials for organization
     * 
     * Delete specific android credentials for an organization. NOTE:
     * you must be a manager in the organization to
     * delete credentials.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteAndroidForOrg.Responses.$204>
  }
  ['/orgs/{orgid}/projects/{projectid}/credentials/signing/android']: {
    /**
     * getAllAndroid - Get All Android Credentials
     * 
     * Get all credentials available for the project. A user in the
     * projects org will see all credentials uploaded for any project
     * within the org, whereas a user with project-level permissions
     * will only see credentials assigned to the specific project.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllAndroid.Responses.$200>
    /**
     * addCredentialsAndroid - Upload Android Credentials
     * 
     * Upload a new android keystore for the project. NOTE: you must
     * be a manager in the project's organization to add new credentials.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddCredentialsAndroid.Responses.$201>
  }
  ['/orgs/{orgid}/projects/{projectid}/credentials/signing/android/{credentialid}']: {
    /**
     * getOneAndroid - Get Android Credential Details
     * 
     * Get specific android credential details
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOneAndroid.Responses.$200>
    /**
     * updateAndroid - Update Android Credentials
     * 
     * Update an android keystore for the project. NOTE: you must
     * be a manager in the project's organization to add new credentials.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateAndroid.Responses.$200>
    /**
     * deleteAndroid - Delete Android Credentials
     * 
     * Delete specific android credentials for a project. NOTE:
     * you must be a manager in the project's organization to
     * delete credentials.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteAndroid.Responses.$204>
  }
  ['/orgs/{orgid}/credentials/signing/ios']: {
    /**
     * getAllIosForOrg - Get All iOS Credentials for an oganization
     * 
     * Get all credentials available for the project. A user in the
     * projects org will see all credentials uploaded for any project
     * within the org, whereas a user with project-level permissions
     * will only see credentials assigned to the specific project.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllIosForOrg.Responses.$200>
    /**
     * addCredentialsIosForOrg - Upload iOS Credentials for organization
     * 
     * Upload a new iOS certificate and provisioning profile for the organization.
     * NOTE: you must be a manager in the organization to add new
     * credentials.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddCredentialsIosForOrg.Responses.$201>
  }
  ['/orgs/{orgid}/credentials/signing/ios/{credentialid}']: {
    /**
     * getOneIosForOrg - Get iOS Credential Details for organization
     * 
     * Get specific iOS credential details
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOneIosForOrg.Responses.$200>
    /**
     * updateIosForOrg - Update iOS Credentials for organization
     * 
     * Update an iOS certificate / provisioning profile.
     * NOTE: you must be a manager in the project's organization to update
     * credentials.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateIosForOrg.Responses.$200>
    /**
     * deleteIosForOrg - Delete iOS Credentials for organization
     * 
     * Delete specific ios credentials. NOTE:
     * you must be a manager in the project's organization to
     * delete credentials.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteIosForOrg.Responses.$204>
  }
  ['/orgs/{orgid}/projects/{projectid}/credentials/signing/ios']: {
    /**
     * getAllIos - Get All iOS Credentials
     * 
     * Get all credentials available for the project. A user in the
     * projects org will see all credentials uploaded for any project
     * within the org, whereas a user with project-level permissions
     * will only see credentials assigned to the specific project.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllIos.Responses.$200>
    /**
     * addCredentialsIos - Upload iOS Credentials
     * 
     * Upload a new iOS certificate and provisioning profile for the project.
     * NOTE: you must be a manager in the project's organization to add new
     * credentials.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddCredentialsIos.Responses.$201>
  }
  ['/orgs/{orgid}/projects/{projectid}/credentials/signing/ios/{credentialid}']: {
    /**
     * getOneIos - Get iOS Credential Details
     * 
     * Get specific iOS credential details
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOneIos.Responses.$200>
    /**
     * updateIos - Update iOS Credentials
     * 
     * Update an iOS certificate / provisioning profile for the project.
     * NOTE: you must be a manager in the project's organization to update
     * credentials.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateIos.Responses.$200>
    /**
     * deleteIos - Delete iOS Credentials
     * 
     * Delete specific ios credentials for a project. NOTE:
     * you must be a manager in the project's organization to
     * delete credentials.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteIos.Responses.$204>
  }
  ['/orgs/{orgid}/credentials/signing/osx']: {
    /**
     * getAllOsxForOrg - Get All OSX Credentials for an oganization
     * 
     * Get all credentials available for the project. A user in the
     * projects org will see all credentials uploaded for any project
     * within the org, whereas a user with project-level permissions
     * will only see credentials assigned to the specific project.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllOsxForOrg.Responses.$200>
    /**
     * addCredentialsOsxForOrg - Upload OSX Credentials for organization
     * 
     * Upload a new OSX certificate and provisioning profile for the organization.
     * NOTE: you must be a manager in the organization to add new
     * credentials.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddCredentialsOsxForOrg.Responses.$201>
  }
  ['/orgs/{orgid}/credentials/signing/osx/{credentialid}']: {
    /**
     * getOneOsxForOrg - Get OSX Credential Details for organization
     * 
     * Get specific OSX credential details
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOneOsxForOrg.Responses.$200>
    /**
     * updateOsxForOrg - Update OSX Credentials for organization
     * 
     * Update an OSX certificate / provisioning profile.
     * NOTE: you must be a manager in the project's organization to update
     * credentials.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateOsxForOrg.Responses.$200>
    /**
     * deleteOsxForOrg - Delete OSX Credentials for organization
     * 
     * Delete specific OSX credentials. NOTE:
     * you must be a manager in the project's organization to
     * delete credentials.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteOsxForOrg.Responses.$204>
  }
  ['/orgs/{orgid}/projects/{projectid}/credentials/signing/osx']: {
    /**
     * getAllOsx - Get All OSX Credentials
     * 
     * Get all credentials available for the project. A user in the
     * projects org will see all credentials uploaded for any project
     * within the org, whereas a user with project-level permissions
     * will only see credentials assigned to the specific project.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllOsx.Responses.$200>
    /**
     * addCredentialsOsx - Upload OSX Credentials
     * 
     * Upload a new OSX certificate and provisioning profile for the project.
     * NOTE: you must be a manager in the project's organization to add new
     * credentials.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddCredentialsOsx.Responses.$201>
  }
  ['/orgs/{orgid}/projects/{projectid}/credentials/signing/osx/{credentialid}']: {
    /**
     * getOneOsx - Get OSX Credential Details
     * 
     * Get specific OSX credential details
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOneOsx.Responses.$200>
    /**
     * updateOsx - Update OSX Credentials
     * 
     * Update an OSX certificate / provisioning profile for the project.
     * NOTE: you must be a manager in the project's organization to update
     * credentials.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateOsx.Responses.$200>
    /**
     * deleteOsx - Delete OSX Credentials
     * 
     * Delete specific OSX credentials for a project. NOTE:
     * you must be a manager in the project's organization to
     * delete credentials.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteOsx.Responses.$204>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/builds/artifacts']: {
    /**
     * deleteAllBuildArtifacts - Delete all artifacts associated with all non-favorited builds for a specified buildtargetid (_all is allowed).
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteAllBuildArtifacts.Responses.$204>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/builds/{number}/artifacts']: {
    /**
     * deleteBuildArtifacts - Delete all artifacts associated with a specific build
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteBuildArtifacts.Responses.$204>
  }
  ['/orgs/{orgid}/projects/{projectid}/artifacts/delete']: {
    /**
     * batchDeleteBuildArtifacts - Delete artifacts for a batch of builds
     * 
     * Delete all artifacts associated with the builds identified by the
     * provided build target ids and build numbers. Builds marked as do
     * not delete or that are currently building will be ignored.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BatchDeleteBuildArtifacts.Responses.$204>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/builds']: {
    /**
     * getBuilds - List all builds
     * 
     * List all running and finished builds, sorted by build number
     * (optionally paginating the results). Use '_all' as the buildtargetid
     * to get all configured build targets. The response includes a Content-Range
     * header that identifies the range of results returned and the total number
     * of results matching the given query parameters.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBuilds.Responses.$200>
    /**
     * startBuilds - Create new build
     * 
     * Start the build process for this build target (or all targets,
     * if '_all' is specified as the buildtargetid), if there is not one
     * currently in process.
     * 
     * If a build is currently in process that information will be related
     * in the 'error' field.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.StartBuilds.Responses.$202>
    /**
     * cancelAllBuilds - Cancel all builds
     * 
     * Cancel all builds in progress for this build target (or all targets,
     * if '_all' is specified as the buildtargetid). Canceling an already
     * finished build will do nothing and respond successfully.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelAllBuilds.Responses.$204>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/builds/{number}']: {
    /**
     * getBuild - Build Status
     * 
     * Retrieve information for a specific build. A Build resource contains
     * information related to a build attempt for a build target, including
     * the build number, changeset, build times, and other pertinent data.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBuild.Responses.$200>
    /**
     * cancelBuild - Cancel build
     * 
     * Cancel a build in progress. Canceling an already finished build
     * will do nothing and respond successfully.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelBuild.Responses.$204>
    /**
     * updateBuild - Update build information
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateBuild.Responses.$200>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/builds/{number}/auditlog']: {
    /**
     * getAuditLog - Get audit log
     * 
     * Retrieve a list of settings changes between the last and current build.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAuditLog.Responses.$200>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/builds/{number}/resign']: {
    /**
     * resignBuildArtifact - Re-sign a build artifact
     * 
     * Re-sign a build artifact using the most recent credentials associated with the buildtarget.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ResignBuildArtifact.Responses.$202>
  }
  ['/orgs/{orgid}/builds']: {
    /**
     * getBuildsForOrg - List all builds for org
     * 
     * List all running and finished builds, sorted by build number
     * (optionally paginating the results). The response includes a Content-Range
     * header that identifies the range of results returned and the total number
     * of results matching the given query parameters.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBuildsForOrg.Responses.$200>
    /**
     * cancelBuildsForOrg - Cancel builds for org
     * 
     * Cancel all in progress builds for an organization. Canceling an already finished build
     * will do nothing and respond successfully.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CancelBuildsForOrg.Responses.$204>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/builds/{number}/log']: {
    /**
     * getBuildLog - Get build log
     * 
     * Retrieve the plain text log for a specifc build.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBuildLog.Responses.Default>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/builds/{number}/steps']: {
    /**
     * getBuildSteps - Get the build steps for a given build
     * 
     * Retrieves all build steps for a build, this replaces the old method where we would manually download the
     * build report artifacts and allows us to add more functionality into build steps.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBuildSteps.Responses.$200>
  }
  ['/orgs/{orgid}/projects/{projectid}/buildtargets/{buildtargetid}/builds/{number}/share']: {
    /**
     * getShare - Get the share link
     * 
     * Gets a share link if it exists
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetShare.Responses.$200 | Paths.GetShare.Responses.$404>
    /**
     * createShare - Create a new link to share a project
     * 
     * Create a new short link to share a project. If this is called when a share already exists, that share
     * will be revoked and a new one created.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateShare.Responses.$201 | Paths.CreateShare.Responses.$404>
    /**
     * modifyShare - Modify existing share link
     * 
     * Modify an existing share link. Only intended for updating the Expiry without revoking the link.
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ModifyShare.Responses.$201 | Paths.ModifyShare.Responses.$404>
    /**
     * revokeShare - Revoke a shared link
     * 
     * Revoke a shared link, both {buildtargetid} and {number} may use _all to revoke all share links for a given buildtarget or entire project.
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokeShare.Responses.$204 | Paths.RevokeShare.Responses.$404>
  }
  ['/shares/{shareid}']: {
    /**
     * getShareMetadata - Get details on shared build including download link
     * 
     * This is an endpoint accessible without an api key that provides information about a
     * specific build including download links.
     * A shareid is generated by POSTing to a <a href="#!/builds/createShare">build's share endpoint</a>.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetShareMetadata.Responses.$200>
  }
  ['/status']: {
    /**
     * getStatus - Get Cloud Build Status
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStatus.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
