<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInite3f026841d00ef31b69c8545aab109ba
{
    public static $prefixLengthsPsr4 = array (
        'J' => 
        array (
            'Joaobotoni\\Api\\' => 15,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Joaobotoni\\Api\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInite3f026841d00ef31b69c8545aab109ba::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInite3f026841d00ef31b69c8545aab109ba::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInite3f026841d00ef31b69c8545aab109ba::$classMap;

        }, null, ClassLoader::class);
    }
}
