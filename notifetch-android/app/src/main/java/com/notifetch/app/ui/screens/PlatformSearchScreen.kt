package com.notifetch.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.notifetch.app.R
import com.notifetch.app.data.local.PlatformConfig

/**
 * PlatformSearchScreen
 *
 * Lets users search for a delivery platform by its real brand name
 * (e.g., "Swiggy", "Zomato", "DoorDash") and find which "Platform N"
 * number it maps to in NotiFetch.
 *
 * LEGAL COMPLIANCE:
 * - The app itself only shows "Platform 1", "Platform 2", etc. (generic names)
 * - This search screen is a HELP tool so users know which platform number
 *   corresponds to which app they use
 * - Brand names are only displayed in this search screen, never in the
 *   main notification feed or platform list
 * - Users can rename platforms to anything they want in Settings
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PlatformSearchScreen(
    navController: NavController,
    platforms: List<PlatformConfig>,
) {
    var searchQuery by remember { mutableStateOf("") }

    // The brand-name-to-platform-number mapping
    // In production this would come from a bundled JSON asset
    val brandMapping = remember {
        listOf(
            BrandMapping("Swiggy", "Platform 9", "in.swiggy.deliveryapp", "🇮🇳 India"),
            BrandMapping("Swiggy Partner", "Platform 9", "in.swiggy.partner", "🇮🇳 India"),
            BrandMapping("Zomato Delivery", "Platform 10", "com.zomato.delivery", "🇮🇳 India"),
            BrandMapping("Zomato Partner", "Platform 10", "com.zomato.deliverypartner", "🇮🇳 India"),
            BrandMapping("Blinkit", "Platform 24", "app.blinkit.onboarding", "🇮🇳 India"),
            BrandMapping("Zepto Rider", "Platform 25", "com.zepto.rider", "🇮🇳 India"),
            BrandMapping("BigBasket", "Platform 26", "com.bigbasket.dapp.activity", "🇮🇳 India"),
            BrandMapping("Dunzo Partner", "Platform 27", "com.dunzo.partner", "🇮🇳 India"),
            BrandMapping("Instamart", "Platform 28", "com.instamart.delivery", "🇮🇳 India"),
            BrandMapping("DoorDash Driver", "Platform 51", "com.doordash.driverapp", "🇺🇸 USA"),
            BrandMapping("Grubhub Driver", "Platform 52", "com.grubhub.driver", "🇺🇸 USA"),
            BrandMapping("Uber Eats", "Platform 53", "com.ubereats.driver", "🌍 Global"),
            BrandMapping("Instacart Shopper", "Platform 54", "com.instacart.shopper", "🇺🇸 USA"),
            BrandMapping("Amazon Flex", "Platform 55", "com.amazon.flex.rabbit", "🇺🇸 USA"),
            BrandMapping("Amazon Relay", "Platform 56", "com.amazon.relay", "🇺🇸 USA"),
            BrandMapping("UPS Driver", "Platform 57", "com.ups.genesispd", "🇺🇸 USA"),
            BrandMapping("Deliveroo Rider", "Platform 71", "com.deliveroo.orderapp", "🇬🇧 UK/EU"),
            BrandMapping("Just Eat Driver", "Platform 72", "com.justeat.app.uk", "🇬🇧 UK"),
            BrandMapping("Takeaway Driver", "Platform 73", "com.takeaway.android", "🇪🇺 EU"),
            BrandMapping("Foodpanda Rider", "Platform 74", "com.foodpanda.delivery", "🇸🇬 SEA"),
            BrandMapping("Grab Driver", "Platform 75", "com.grab.driver", "🇸🇬 SEA"),
            BrandMapping("Gojek Driver", "Platform 76", "com.gojek.driver", "🇮🇩 Indonesia"),
            BrandMapping("Flipkart Logistics", "Platform 101", "com.flipkart.logistics", "🇮🇳 India"),
            BrandMapping("Delhivery Partner", "Platform 102", "com.delhivery.delhiverypartner", "🇮🇳 India"),
            BrandMapping("Ecom Express", "Platform 103", "com.ecomexpress.oneBoarding", "🇮🇳 India"),
            BrandMapping("Xpressbees", "Platform 104", "com.xpressbees.unified_new_arch", "🇮🇳 India"),
            BrandMapping("Ekart Logistics", "Platform 105", "com.ekart.logistics.app", "🇮🇳 India"),
            BrandMapping("Shadowfax", "Platform 106", "com.shadowfax.driver", "🇮🇳 India"),
            BrandMapping("Porter", "Platform 107", "com.porter.driver", "🇮🇳 India"),
            BrandMapping("Rapido Bike", "Platform 108", "com.rapido.driver", "🇮🇳 India"),
            BrandMapping("Ola Driver", "Platform 109", "com.olacabs.driver", "🇮🇳 India"),
            BrandMapping("Uber Driver", "Platform 110", "com.ubercab.driver", "🌍 Global"),
        )
    }

    val filteredResults = remember(searchQuery) {
        if (searchQuery.isBlank()) {
            brandMapping
        } else {
            brandMapping.filter {
                it.brandName.contains(searchQuery, ignoreCase = true) ||
                it.platformNumber.contains(searchQuery, ignoreCase = true) ||
                it.packageName.contains(searchQuery, ignoreCase = true)
            }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Find Platform Number") },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface,
                )
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            // Info banner
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.3f)
                )
            ) {
                Text(
                    text = "Search for a delivery platform by name to find its NotiFetch platform number. " +
                           "Then go to Settings → Platforms to rename it.",
                    modifier = Modifier.padding(16.dp),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }

            // Search field
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                placeholder = { Text("Search platform name (e.g., Swiggy)...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                trailingIcon = {
                    if (searchQuery.isNotEmpty()) {
                        IconButton(onClick = { searchQuery = "" }) {
                            Icon(Icons.Default.Clear, contentDescription = "Clear")
                        }
                    }
                },
                keyboardOptions = KeyboardOptions(
                    capitalization = KeyboardCapitalization.Words,
                    imeAction = ImeAction.Search
                ),
                singleLine = true
            )

            Spacer(modifier = Modifier.height(8.dp))

            // Results count
            Text(
                text = "${filteredResults.size} platform${if (filteredResults.size != 1) "s" else ""} found",
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            // Results list
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(filteredResults) { mapping ->
                    BrandMappingCard(mapping)
                }
            }
        }
    }
}

@Composable
private fun BrandMappingCard(mapping: BrandMapping) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = mapping.brandName,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = mapping.region,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
            Column(horizontalAlignment = Alignment.End) {
                Text(
                    text = mapping.platformNumber,
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }
    }
}

data class BrandMapping(
    val brandName: String,
    val platformNumber: String,
    val packageName: String,
    val region: String,
)
