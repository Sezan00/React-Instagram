<?php

  function sezan($path = null, $parameters = [], $secure = null)
    {
       return url('storage/' . $path, $parameters, $secure);
    }