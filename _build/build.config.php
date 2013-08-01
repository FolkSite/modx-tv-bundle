<?php
define('PKG_NAME', 'TV-Bundle');
define('PKG_NAMESPACE', 'tv-bundle');
define('PKG_VERSION','0.0.1');
define('PKG_RELEASE','alpha');

define('PKG_ROOT',dirname(dirname(__FILE__)).'/');
define('PKG_CORE',PKG_ROOT.'core/components/'.PKG_NAMESPACE.'/');
define('PKG_ASSETS',PKG_ROOT.'assets/components/'.PKG_NAMESPACE.'/');
define('PKG_BUILD',PKG_ROOT.'_build/');
define('PKG_COMMIT',Tools::getGitCommitId(PKG_ROOT));
require PKG_ROOT.'config.core.php';
